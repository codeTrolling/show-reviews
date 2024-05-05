const express = require("express");
const router = express.Router();
const show = require("../models/show");
const user = require("../models/user");
const review = require("../models/review");


router.get("/", async (req, res) => {
    const shows = await show.find();
    res.json(shows)
})

router.get("/getShow/:show", async (req, res) => {
    const showToGet = await show.findOne({title: {"$eq": req.params.show}});
    try{
        res.json(showToGet);
    }
    catch (err) {
        res.json({"message": err.message})
    }
})


async function getUniqueRandomShow(currentShows){
    let isUnique = false;
    while(!isUnique){
        const randomShow = await show.aggregate([{"$sample": {"size": 1}}])
        isUnique = true;
        for(let i = 0; i < currentShows.length; i++){
            if(currentShows[i].title == randomShow[0].title){
                isUnique = false;
                break;
            }
        }
        if(isUnique){
            return randomShow[0];
        }
    }
}

router.get("/randomizedShows", async (req, res) => {
    var showsToSend = [];
    while(showsToSend.length < 5){
        showsToSend.push(await getUniqueRandomShow(showsToSend));
    }
    
    res.status(200).json({"status": 200, "shows": showsToSend})
})

router.get("/randomizedImages", async (req, res) => {
    var showsToSend = [];
    // it looks better with more than 5. You can change this to make it look more appealing. The reason it is 5 right now is because populateDB.js script only adds 5 shows. 10 show images look pretty.
    const numberOfImagesToSend = 5
    while(showsToSend.length < numberOfImagesToSend){
        showsToSend.push(await getUniqueRandomShow(showsToSend));
    }

    let imagesToSend = [];
    for(let i = 0; i < numberOfImagesToSend; i++){
        imagesToSend.push(showsToSend[i].image)
    }

    res.status(200).json({"status": 200, "shows": imagesToSend})
})

router.get("/AllShows/:filter/:page", async (req, res) => {
    var page = req.params.page;
    page = (page - 1) * 10;
    if(page < 0){
        page = 0;
    }
    var shows;
    if(req.params.filter === "Top rated"){
        shows = await show.find().sort({"rating" : -1, "reviewsCount": 1}).skip(page).limit(10)
    }
    else if(req.params.filter === "Most popular"){
        shows = await show.find().sort({"reviewsCount" : -1, "rating": -1}).skip(page).limit(10)
    }
    else if(req.params.filter === "Newest"){
        shows = await show.find().sort({"releaseDate" : -1, "rating": 1}).skip(page).limit(10)
    }
    else if(req.params.filter === "Lowest rated"){
        shows = await show.find().sort({"rating" : 1, "reviewsCount": 1}).skip(page).limit(10)
    }
    else if(req.params.filter === "Movies"){
        shows = await show.find({"type": "Movies"}).sort({"rating" : -1, "reviewsCount": 1}).skip(page).limit(10)
    }
    else if(req.params.filter === "TV series"){
        shows = await show.find({"type": "TV series"}).sort({"rating" : -1, "reviewsCount": 1}).skip(page).limit(10)
    }
    else if(req.params.filter === "Anime"){
        shows = await show.find({"type": "Anime"}).sort({"rating" : -1, "reviewsCount": 1}).skip(page).limit(10)
    }
    try{
        res.json(shows)
    }
    catch (err){
        res.json({"message": err.message})
    }
})

router.post('/', async (req, res) => {
    const getUser = await user.findOne({sessionId: {"$eq": req.body.sessionId}});
    if(getUser === null || !getUser.isAdmin){
        res.status(200);
        return;
    }
    const showToAdd = new show({
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        mainCast: req.body.mainCast,
        genres: req.body.genres,
        duration: req.body.duration,
        pgRating: req.body.pgRating,
        releaseDate: req.body.releaseDate
    })
    try{
        const newShow = await showToAdd.save();
        let temp = {}
        temp["status"] = "200"
        res.status(200).json(temp);
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

router.post("/search", async (req, res) => {
    const shows = await show.find({"title" : {"$regex" : req.body.title, "$options": "i"}}).sort({"reviewsCount" : 1}).limit(7);
    if(shows !== null){
        res.json(shows);
    }
})

router.post("/:title", async (req, res) => {
    const showToDelete = await show.findOne({title: {"$eq": req.params.title}});
    const getUser = await user.findOne({sessionId: {"$eq": req.body.sessionId}});
    if(getUser === null || !getUser.isAdmin){
        res.status(200);
        return;
    }
    try{
        await showToDelete.deleteOne();
        let temp = { "status" : "200"};
        res.status(200).json(temp);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({message: err.message})
    }
})

router.patch("/updateAll", async (req, res) => {
    const getUser = await user.findOne({sessionId: {"$eq": req.body.sessionId}});
    if(getUser === null || !getUser.isAdmin){
        return;
    }
    const shows = await show.find();
    try{
        for(var item in shows){
            var temp = await updateRatingAll(shows[item])
        }
        res.json({"message": "Successfully updated"})
    }
    catch (err){
        res.json({"message": err.message})
    }
})

//update shows' ratings. in a practical scenario this would be called once or twice a day as i might take time and use a lot of the server's resources when storing large amout of data
const updateRatingAll = async (showToUpdate) =>{
    const allReviewsForThisShow = await review.find({show: {"$eq": showToUpdate.title}});
    var count = allReviewsForThisShow.length;
    var addedRatings = 0;
    allReviewsForThisShow.forEach(item => {
        addedRatings += item.rating;
    })
    // averages the ratings
    if(count > 0){
        addedRatings /= count;
    }
    showToUpdate.rating = addedRatings
    await showToUpdate.save();
    return showToUpdate
}

module.exports = router;
const express = require("express");
const router = express.Router();
const show = require("../models/show");
const fs = require("fs");
const path = require("path");
const user = require("../models/user");

// const multer = require("multer");
// var imageFileName = "";
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../backendImages")
//     },
//     filename: (req, file, callback) => {
//         callback(null, Date.now() + path.extname(file.originalname));
//         imageFileName = Date.now() + path.extname(file.originalname);
//     }
// })
// const upload = multer({storage: storage});

router.get("/", async (req, res) => {
    const shows = await show.find();
    //const b64 = shows.image.toString('base64');
    // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
    // console.log(shows[0])
    //const b64 = Buffer.from(shows[0].image, "utf-8")
    //console.log(b64.toString("base64"));
    //const mimeType = 'image/jpg'; // e.g., image/png
    //var replacing = b64.toString("base64");
    //var fileData = replaceing.replace('/^data:image\/\w+;base64,/', "");
    //var buffer = Buffer.from(fileData, 'base64');

    //console.log(Buffer.from(shows[0].image, "utf-8"));
    // console.log(shows[0].image.toString())
    // const rawFile = shows[0].image.toString();
    // var fileData = rawFile.replace('/^data:image\/\w+;base64,/', "");
    // var buffer = Buffer.from(fileData, 'base64');
    // const newFileName = 'nodejs.png';
    // fs.writeFile("../backendImages/testimage.jpg", buffer, () => {console.log("cool")})
    //res.send(`<p> ${replacing.toString("base64")}</p>`)
    
    //res.send(`<img src="data:${mimeType};base64,${shows[0].image.toString()}" />` + `<p>${shows[0].image.toString()}</p>`);
    //res.send(`<img src=${shows[0].image}/>` + `<p> ${shows[0].image}</p>`)
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

router.get("/randomizedShows", async (req, res) => {
    const showsToSend = await show.aggregate([{"$sample": {"size": 5}}])

    res.status(200).json({"status": 200, "shows": showsToSend})
})

router.get("/AllShows/:filter", async (req, res) => {
    var shows;
    if(req.params.filter === "Top rated"){
        shows = await show.find().sort({"rating" : 1, "reviewsCount": 1}).limit(20)
    }
    else if(req.params.filter === "Most popular"){
        shows = await show.find().sort({"reviewsCount" : 1, "rating": 1}).limit(20)
    }
    else if(req.params.filter === "Newest"){
        shows = await show.find().sort({"releaseDate" : -1, "rating": 1}).limit(20)
    }
    else if(req.params.filter === "Lowest rated"){
        shows = await show.find().sort({"rating" : -1, "reviewsCount": 1}).limit(20)
    }
    else if(req.params.filter === "Movies"){
        shows = await show.find({"type": "Movie"}).sort({"rating" : 1, "reviewsCount": 1}).limit(20)
    }
    else if(req.params.filter === "TV series"){
        shows = await show.find({"type": "TV series"}).sort({"rating" : 1, "reviewsCount": 1}).limit(20)
    }
    else if(req.params.filter === "Anime"){
        shows = await show.find({"type": "Anime"}).sort({"rating" : 1, "reviewsCount": 1}).limit(20)
    }
    try{
        res.json(shows)
    }
    catch (err){
        res.json({"message": err.message})
    }
})

router.post('/', async (req, res) => {
    // const promise = fs.promises.readFile(path(req.body.image));
    // var imageBuffer;

    // Promise.resolve(promise).then(function(buffer){
    //     console.log(buffer);
    //     console.log("WE ARE IN HERE!!!!!!!!!!!")
    //     imageBuffer = buffer
    // });
    //const showImageBuffer = Buffer.from(req.body.image, "utf-8")
    //console.log(showImageBuffer)
    // var mainCastArray = req.body.mainCast;
    // mainCastArray.forEach(element => {
    //     const buffer = Buffer.from(element.image, "utf-8");
    //     element.image = buffer;
    // });
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
    //const shows = await show.find({"title" : '/.*' + req.body.title + '.*/i'}).sort({"reviewsCount" : 1}).limit(7);
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

module.exports = router;
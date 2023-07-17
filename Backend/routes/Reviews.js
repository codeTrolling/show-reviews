const express = require("express");
const router = express.Router();
const reviews = require('../models/review');
const user = require('../models/user');
const shows = require('../models/show');

router.get('/', async (req, res) => {
    try{
        const review = await reviews.find();
        res.json(review);
    }catch(err){
        res.json({error: err.message})
    }
})
router.get('/:id', (req, res) => {
})

router.post('/', async (req, res) => {
    const userSubmiter = await user.findOne({"sessionId": {"$eq": req.body.sessionId}}, {"email": 1, "_id": 0});
    const chosenShow = await shows.findOne({"title": {"$eq": req.body.show}});
    const allUserReviews = await reviews.findOne({"owner": {"$eq": userSubmiter.email}, "show": {"$eq": req.body.show}});
    if(allUserReviews !== null){
        res.status(400).json({"message": "You have already rated this show"});
        return
    }
    if(userSubmiter === null){
        res.status(400).json({"message": "Invalid user"});
        return
    }
    if(chosenShow === null){
        res.status(400).json({"message": "This show does not exist"})
        return
    }
    let reviewToAdd = new reviews({
        owner: userSubmiter.email,
        show: req.body.show,
        rating: req.body.rating
    });
    if(req.body.reviewContent !== ""){
        reviewToAdd["reviewContent"] = req.body.reviewContent;
    }
    try{
        await reviewToAdd.save();
        res.status(200).json({"status": 200})
    } 
    catch (err){
        res.status(400).json({"message": err.message})
    }
})

// get user reviews
router.post("/userReviews", async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    var reviewsToSend = "";
    if(getUser === null){
        res.status(400).json({"message": "Invalid user"});
        return
    }
    if(req.body.title !== undefined){
        reviewsToSend = await reviews.findOne({"owner": {"$eq": getUser.email}, "show": {"$eq": req.body.title}});
        let temp = [];
        temp.push(reviewsToSend);
        res.status(200).json({"status": 200, "reviews": temp});
        return;
    }
    var reviewsToSkip = (req.body.page - 1) * 10;
    if(reviewsToSkip < 0){
        reviewsToSkip = 0
    }
    reviewsToSend = await reviews.find({"owner": {"$eq": getUser.email}}).sort({"likes": 1}).skip(reviewsToSkip).limit(10);
    res.status(200).json({"status": 200, "reviews": reviewsToSend});
})


module.exports = router;
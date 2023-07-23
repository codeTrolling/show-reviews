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

// get user's reviews (MyReviews page)
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

// delete review
router.post("/deleteReview", async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    const reviewToDelete = await reviews.findOne({"_id": {"$eq": req.body.reviewId}});
    if(getUser === null){
        res.status(400).json({"status": 400, "message": "Invalid user"});
        return;
    }
    if(reviewToDelete === null){
        res.status(400).json({"message": "Review not found"});
        return;
    }
    if(reviewToDelete.owner !== getUser.email){
        res.status(400).json({"status": 400, "message": "Invalid user"});
        return;
    }
    await reviewToDelete.deleteOne();
    res.status(200).json({"status": 200});
})

router.post("/showReviews", async (req, res) => {
    var userLikedReviews = [];
    var userDislikedReviews = [];
    var getUser;
    if(req.body.page !== undefined){
        let tempPage = (parseInt(req.body.page) - 1) * 10;
        if(tempPage < 0){
            tempPage = 0;
        }
        const fetchedReviews = await reviews.find({"show": {"$eq": req.body.title}}).skip(tempPage).limit(10);
        let reviewsToSend = [];
        fetchedReviews.forEach(item => {
        reviewsToSend.push({
            "_id": item._id,
            "owner": item.owner,
            "show": item.show,
            "likes": item.likes,
            "dislikes": item.dislikes,
            "rating": item.rating,
            "reviewContent": item.reviewContent,
            "reviewDate": item.reviewDate
        })
    })
        if(req.body.sessionId !== undefined && req.body.sessionId !== null){
            getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
        }
        var counter = 0;
        for(const item of reviewsToSend){
            const changeReviewOwnerToUsername = async () => {
                const changeOwner = await user.findOne({"email": {"$eq": item.owner}})
                return [changeOwner.username, changeOwner.image];
            }
            let temp = await changeReviewOwnerToUsername()
            reviewsToSend[counter].owner = temp[0];
            reviewsToSend[counter].image = temp[1];

            if(getUser !== undefined && getUser !== null){
                if(getUser.likedReviews.includes(item._id)){
                    userLikedReviews.push(item._id);
                }
                else if(getUser.dislikedReviews.includes(item._id)){
                    userDislikedReviews.push(item._id);
                }
            }
            counter++;
        }
        res.status(200).json({"status": 200, "reviews": reviewsToSend, "likedReviews": userLikedReviews, "dislikedReviews": userDislikedReviews});
        return;
    }

    let tempPage = (parseInt(req.body.page) - 1) * 10;
    if(tempPage < 0){
        tempPage = 0;
    }
    const fetchedReviews = await reviews.find({"show": {"$eq": req.body.title}}).skip(tempPage).limit(3);
    let reviewsToSend = [];
    fetchedReviews.forEach(item => {
        reviewsToSend.push({
            "_id": item._id,
            "owner": item.owner,
            "show": item.show,
            "likes": item.likes,
            "dislikes": item.dislikes,
            "rating": item.rating,
            "reviewContent": item.reviewContent,
            "reviewDate": item.reviewDate
        })
    })

    if(req.body.sessionId !== undefined && req.body.sessionId !== null){
        getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    }
    var counter = 0;
    for(const item of reviewsToSend){
        const changeReviewOwnerToUsername = async () => {
            const changeOwner = await user.findOne({"email": {"$eq": item.owner}})
            return [changeOwner.username, changeOwner.image];
        }
        let temp = await changeReviewOwnerToUsername()
        reviewsToSend[counter].owner = temp[0];
        reviewsToSend[counter].image = temp[1];

        if(getUser !== undefined && getUser !== null){
            if(getUser.likedReviews.includes(item._id)){
                userLikedReviews.push(item._id);
            }
            else if(getUser.dislikedReviews.includes(item._id)){
                userDislikedReviews.push(item._id);
            }
        }
        counter++;
    }
    res.status(200).json({"status": 200, "reviews": reviewsToSend, "likedReviews": userLikedReviews, "dislikedReviews": userDislikedReviews})
})

router.patch("/likeReview", async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    if(getUser === null){
        return;
    }
    const getReview = await reviews.findOne({"_id": {"$eq": req.body.reviewId}});
    if(getReview === null){
        return;
    }
    if(getUser.likedReviews.includes(getReview._id)){
        let tempIndex = getUser.likedReviews.indexOf(getReview._id);
        getUser.likedReviews.splice(tempIndex, 1);
        getReview.likes -= 1;
        await getUser.save();
        await getReview.save();
    }
    else{
        if(getUser.dislikedReviews.includes(getReview._id)){
            let tempIndex = getUser.dislikedReviews.indexOf(getReview._id);
            getUser.dislikedReviews.splice(tempIndex, 1);
            getReview.dislikes -= 1;
        }
        getUser.likedReviews.push(getReview._id);
        getReview.likes += 1;
        await getUser.save();
        await getReview.save();
    }
    res.status(200)
})

router.patch("/dislikeReview", async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    if(getUser === null){
        return;
    }
    const getReview = await reviews.findOne({"_id": {"$eq": req.body.reviewId}})
    if(getReview === null){
        return;
    }
    if(getUser.dislikedReviews.includes(getReview._id)){
        let tempIndex = getUser.dislikedReviews.indexOf(getReview._id);
        getUser.dislikedReviews.splice(tempIndex, 1);
        getReview.dislikes -= 1;
        await getUser.save();
        await getReview.save();
    }
    else{
        if(getUser.likedReviews.includes(getReview._id)){
            let tempIndex = getUser.likedReviews.indexOf(getReview._id);
            getUser.likedReviews.splice(tempIndex, 1);
            getReview.likes -= 1;
        }
        getUser.dislikedReviews.push(getReview._id);
        getReview.dislikes += 1;
        await getUser.save();
        await getReview.save();
    }
    res.status(200)
})

module.exports = router;
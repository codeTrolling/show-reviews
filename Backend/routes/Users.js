const express = require("express");
const router = express.Router();
const user = require("../models/user");
const reviews = require("../models/review");

router.get('/', async (req, res) => {

    res.json(await user.find())
})

router.post('/getUser', async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    if(getUser !== null){
        res.status(200).json({"status": 200, "picture": getUser.image})
    }
})

router.post('/checkAdmin', async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    if(getUser !== null && getUser.isAdmin){
        res.status(200)
    }
    else{
        res.status(200).json({"redirect": true})
    }
})

router.patch('/updateImage', async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    if(getUser !== null && req.body.image !== null){
        try{
            getUser.image = req.body.image;
            const updated = await getUser.save();
            res.status(200).json({"status": 200});
        }
        catch(err) {
            res.status(400).json({"message": err.message});
        }
    }
})

router.post('/register', async (req, res) => {
    const newUserEmail = await user.findOne({"email": {"$eq": req.body.email}})
    const newUserUsername = await user.findOne({"username": {"$eq": req.body.username}})
    if(newUserEmail === null && newUserUsername === null && req.body.password !== ""){
        try{
            let sessionI = await generateSessionid(30)
            let newUser = new user({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                image: req.body.image !== null ? req.body.image : null,
                isAdmin: false,
                sessionId: sessionI
            })
            const success = await newUser.save();
            res.status(200).json({"status": 200, "sessionId" : sessionI});
        }
        catch (err){
            res.status(400).json({"message": err.message});
        }
    }
    else if(newUserEmail !== null){
        res.status(400).json({"message": "This email is already registered!"});
    }
    else if(newUserUsername !== null){
        res.status(400).json({"message": "Username is taken!"});
    }
    else if(req.body.password === ""){
        res.status(400).json({"message": "This password is too weak!"});
    }
    else{
        res.status(400).json({"message": "Something went wrong!"})
    }
})

router.patch('/login', async (req, res) => {
    const logUser = await user.findOne({"$or": [{"email": {"$eq": req.body.email}}, {"username": {"$eq": req.body.email}}]});
    if(logUser === null){
        res.status(400).json({"message": "Invalid credentials!"})
    }
    if(logUser.password === req.body.password){
        let sessionId = await generateSessionid(30);
        logUser.sessionId = sessionId;
        try{
            const updated = await logUser.save();
            res.status(200).json({"status": 200, "sessionId": sessionId});
        }
        catch (err){
            res.status(400).json({"message": err.message});
        }
    }
    else if(logUser.password !== req.body.password){
        res.status(400).json({"message": "Invalid credentials! Hacky Hacky..."});
    }
    else{
        res.status(400).json({"message": "Something went wrong!"});
    }
})

router.delete("/deleteUser", async (req, res) => {
    const userToDelete = await user.findOne({"email": {"$eq": "a"}});
    await userToDelete.deleteOne();
})

router.post("/deleteUser", async (req, res) => {
    const userToDelete = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    if(userToDelete === null){
        res.status(400).json({"message": "Unsuccessful. Invalid user."});
        return;
    }
    const userReviews = await reviews.find({"owner": {"$eq": userToDelete.email}});
    if(userReviews !== null){
        userReviews.forEach(item => {
            removeReview(item)
        });
    }
    const reviewLikesToRemove = await reviews.find({"_id": {"$in": userToDelete.likedReviews}});
    if(reviewLikesToRemove !== null){
        reviewLikesToRemove.forEach(item => {
            removeLikes(item);
        })
    }
    const reviewDislikesToRemove = await reviews.find({"_id": {"$in": userToDelete.dislikedReviews}})
    if(reviewDislikesToRemove !== null){
        reviewDislikesToRemove.forEach(item => {
            removeDislikes(item);
        })
    }
    try{
        await userToDelete.deleteOne()
        res.status(200).json({"status": 200})
    }catch(err){
        res.status(400).json({"message": err.message})
    }
})





const generateSessionid = async (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?><';
    const charactersLength = characters.length;
    for (let i = 0;i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if(await user.findOne({"sessionId": {"$eq": result}}) === null){
        return result;
    }
    else{
        return generateSessionid(30);
    }
}


const removeReview = async (reviewToRemove) => {
    await reviewToRemove.deleteOne()
}
const removeLikes = async (likeToRemove) => {
    likeToRemove.likes -= 1;
    await likeToRemove.save();
}
const removeDislikes = async (dislikeToRemove) => {
    dislikeToRemove.dislikes -= 1;
    await dislikeToRemove.save();
}



module.exports = router;
const express = require("express");
const router = express.Router();
const user = require("../models/user");

router.get('/', (req, res) => {
    res.send("hello")
})

router.post('/register', async (req, res) => {
    const newUserEmail = await user.findOne({"email": {"$eq": req.body.email}})
    const newUserUsername = await user.findOne({"username": {"$eq": req.body.username}})
    if(newUserEmail === null && newUserUsername === null && req.body.password !== ""){
        try{
            let sessionI = generateSessionid(40)
            let newUser = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                image: req.body.image !== null ? req.body.image : null,
                isAdmin: false,
                sessionId: sessionI
            }
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
    const logUser = await user.findOne({"$or": [{"email": {"$eq": req.body.email}}, {"username": {"$eq": req.body.username}}]});
    if(logUser === null){
        res.status(400).json({"message": "Invalid credentials!"})
    }
    if(logUser.password === req.body.password){
        let sessionId = generateSessionid(40);
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



const generateSessionid = async (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?><';
    const charactersLength = characters.length;
    let counter = 0;
    for (let i = 0;i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if(await user.findOne({"sessionId": {"$eq": result}})){
        return result;
    }
    else{
        return generateSessionid(40);
    }
}

module.exports = router;
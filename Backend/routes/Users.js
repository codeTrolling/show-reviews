const express = require("express");
const router = express.Router();
const user = require("../models/user");

router.get('/', async (req, res) => {

    res.json(await user.find())
})

router.post('/getUser', async (req, res) => {
    const getUser = await user.findOne({"sessionId": {"$eq": req.body.sessionId}});
    if(getUser !== null){
        res.status(200).json({"status": 200, "picture": getUser.image})
    }
})

router.post('/register', async (req, res) => {
    const newUserEmail = await user.findOne({"email": {"$eq": req.body.email}})
    const newUserUsername = await user.findOne({"username": {"$eq": req.body.username}})
    console.log(newUserUsername)
    if(newUserEmail === null && newUserUsername === null && req.body.password !== ""){
        console.log("in the if")
        try{
            console.log("in the try")
            let sessionI = await generateSessionid(30)
            console.log("this is the problem")
            let newUser = new user({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                image: req.body.image !== null ? req.body.image : null,
                isAdmin: false,
                sessionId: sessionI
            })
            const success = await newUser.save();
            console.log("are we successful?")
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
        let sessionId = generateSessionid(30);
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

module.exports = router;
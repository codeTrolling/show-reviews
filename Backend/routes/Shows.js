const express = require("express");
const router = express.Router();
const show = require("../models/show");

router.get("/", async (req, res) => {
    const shows = await show.find();
    res.json(shows)
})

router.post('/', async (req, res) => {
    res.json(req.body);
})

router.delete("/:title", async (req, res) => {
    let showToDelete = await show.find({ title: {"$eq": req.params.id}})
    try{
        await res.showToDelete.remove();
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;
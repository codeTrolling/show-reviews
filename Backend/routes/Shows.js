const express = require("express");
const router = express.Router();
const show = require("../models/show");

router.get("/", async (req, res) => {
    const shows = await show.find();
    res.json(shows)
})

module.exports = router;
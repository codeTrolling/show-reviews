const express = require("express");
const router = express.Router();
const reviews = require('../models/review');

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

router.post('/', (req, res) => {

})


module.exports = router;
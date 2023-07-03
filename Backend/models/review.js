const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    show: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    dislikes: {
        type: Number,
        required: false,
        default: 0
    },
    rating: {
        type: Number,
        required: true
    },
    reviewContent: {
        type: String,
        required: false
    },
    reviewDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Review", reviewSchema);
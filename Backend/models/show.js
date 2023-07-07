const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: -1
    },
    reviewsCount: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        default: "Not enough info to create a synopsis. Sorry!"
    },
    type: {
        type: String,
        required: true
    },
    mainCast: {
        type: [{
            image: Buffer,
            characterName: String,
            mainCharacter: Boolean,
            actorName: String
        }],
        required: false
    },
    genres: {
        type: Array,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    pgRating: {
        type: String,
        required: true,
        default: "Unknown"
    },
    releaseDate: {
        type: Number,
        required: true,
        default: -1
    }
})

module.exports = mongoose.model("Show", showSchema);
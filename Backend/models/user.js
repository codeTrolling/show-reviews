const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    image:{
        type: String,
        require: true,
        default: null
    },
    email:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        require: true
    },
    sessionId:{
        type: String,
        require: false
    },
    likedReviews:{
        type: Array,
        require: true,
        default: []
    },
    dislikedReviews:{
        type: Array,
        require: true,
        default: []
    }
})

module.exports = mongoose.model("User", userSchema);
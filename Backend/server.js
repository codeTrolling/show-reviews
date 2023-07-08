const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/showReviewdb", { useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (e) => console.error(e))
db.once("open", () => console.log("Connected to db"));

app.use(express.json());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     next();
// })
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const usersRouter = require("./Routes/Users");
app.use("/api/users", usersRouter);

const reviewsRouter = require("./routes/Reviews");
app.use("/api/reviews", reviewsRouter);

const showsRouter = require("./routes/Shows");
app.use("/api/shows", showsRouter);
app.listen(5000);
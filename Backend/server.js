const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/showReviewdb", { useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (e) => console.error(e))
db.once("open", () => console.log("Connected to db"));

app.use(express.json());

const usersRouter = require("./Routes/Users");
app.use("/api/users", usersRouter);

const reviewsRouter = require("./routes/Reviews");
app.use("/api/reviews", reviewsRouter);

const showsRouter = require("./routes/Shows");
app.use("/api/shows", showsRouter);
app.listen(5000);
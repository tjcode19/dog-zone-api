const express = require("express");

const app = express();

const mongoose = require("mongoose");
require("dotenv/config");
const dogRouter = require("./routes/dogs");
const userRouter = require("./routes/users");
const bodyParser = require("body-parser");
const os = require("os");

app.use(bodyParser.json());

//routes
app.use("/dog", dogRouter);
app.use("/user", userRouter);

app.get("", (req, res) => {
  res.send("<h1>Welcome to DogZone</h1> <p>Your number one plug for foreign dogs</p>");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Start the server
app.listen("3000");

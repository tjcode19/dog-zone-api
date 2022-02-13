const express = require("express");

const app = express();
//Use this to genearate JWT_SECRET
// const jwt_token = require("crypto").randomBytes(64).toString("hex");

const mongoose = require("mongoose");
require("dotenv/config");
const dogRouter = require("./routes/dogs");
const userRouter = require("./routes/users");
const os = require("os");


//parse json
app.use(express.json());
//parse form data
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/dog", dogRouter);
app.use("/user", userRouter);

app.use(express.static("./public"));

// app.get("", (req, res) => {
//   res.send("<h1>Welcome to DogZone</h1> <p>Your number one plug for foreign dogs</p>");
// });

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

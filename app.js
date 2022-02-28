const express = require("express");

const app = express();
//Use this to genearate JWT_SECRET
// const jwt_token = require("crypto").randomBytes(64).toString("hex");

const mongoose = require("mongoose");
require("dotenv/config");
const dogRouter = require("./routes/dogs");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
// const os = require("os");

//parse json
app.use(express.json());
//parse form data
app.use(express.urlencoded({ extended: false }));

//routes
app.use(`${process.env.BASE_URL}/dog`, dogRouter);
app.use(`${process.env.BASE_URL}/user`, userRouter);
app.use(`${process.env.BASE_URL}/auth`, authRouter);

app.use(express.static("./public"));

app.all("*", (req, res) => {
  res.status(404).json({
    responseCode: "01",
    responseMessage:
      "This resource you are trying to access is not available. Kindly check the url and try again",
  });
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
app.listen(process.env.PORT || 3000);

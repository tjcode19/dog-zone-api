const Auth = require("../models/Auth");
const Users = require("../models/Users");
const User = require("../models/Users");
const mongoose = require("mongoose");

const { generateAccessToken } = require("../uitls/utils");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      responseCode: "01",
      responseMessage: "Please provide username and password",
    });
  }

  try {
    const user = await Users.findOne({
      email: username,
    }).populate("auth");

    const token = generateAccessToken({
      userId: user._id,
      role: user.auth.role,
    });

    const { firstName, lastName, email } = user;

    if (!user) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "User does not exist",
      });
    }
    if (!user.auth.validPassword(password)) {
      return res.status(400).json({
        responseCode: "01",
        responseMessage: "Wrong Password",
      });
    }

    res.status(200).json({
      responseCode: "00",
      responseMessage: "Login was successful",
      data: {
        token: token,
        firstName: firstName,
        lastName: lastName,
        lastLogin: user.auth.lastLogin,
        role: user.auth.role,
      },
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const resetPassword = async (req, res) => {
  const userId = req.user.userId;

  console.log("user id", userId);

  try {
    const auth = await User.findOne({ _id: userId });

    if (!auth) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "No Record Found",
      });
    }

    res.status(200).json({
      responseCode: "00",
      responseMessage: "Password was reset successful",
    });
  } catch (err) {}
};

const createAuth = async (req, res) => {
  const { username, password, salt, role } = req;
  const auth = new Auth({
    username,
    password,
    salt,
    _id: new mongoose.Types.ObjectId(),
    role: role || "Basic",
  });

  try {
    await auth.save();

    const resp = {
      responseCode: "00",
      responseMessage: "User creation successful",
      id: auth._id,
      role: auth.role,
    };

    return resp;
  } catch (err) {
    console.log(err);
    const resp = {
      responseCode: "01",
      responseMessage: "User creation failed",
      err:
        err.name === "MongoServerError" && err.code === 11000
          ? "Email already exist"
          : "Oops, something went wrong",
    };

    return resp;
  }
};

module.exports = { login, createAuth, resetPassword };

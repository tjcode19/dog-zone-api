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

    const { firstName, lastName} = user;

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
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      responseCode: "01",
      responseMessage: "Password field can not be empty",
    });
  }

  try {
    const user = await User.findOne({ _id: userId }).populate("auth");

    if (!user) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "No Record Found",
      });
    }

    //Set new password
    user.auth.setPassword(password);
    //Save the change.
    await user.auth.save();

    res.status(200).json({
      responseCode: "00",
      responseMessage: "Password was reset successful",
    });
  } catch (err) {
    console.log(err);
    res.json({
      responseCode: "01",
      responseMessage: "Password reset failed",
    });
  }
};

const changePassword = async (req, res) => {
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(404).json({
      responseCode: "01",
      responseMessage: "Please set old and new password",
    });
  }

  try {
    //Find user by id extracetd from the token
    const user = await User.findOne({ _id: userId }).populate("auth");
    //check if any record was returned
    if (!user) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "No Record Found",
      });
    }
    //Check if the current password if valid
    if (!user.auth.validPassword(oldPassword)) {
      return res.status(400).json({
        responseCode: "01",
        responseMessage: "Wrong Current Password",
      });
    }

    //Set new password
    user.auth.setPassword(newPassword);
    //Save the change.
    await user.auth.save();

    res.status(200).json({
      responseCode: "00",
      responseMessage: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({
      responseCode: "01",
      responseMessage: "Password change failed",
    });
  }
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

module.exports = { login, createAuth, resetPassword, changePassword };

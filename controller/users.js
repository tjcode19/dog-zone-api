const Users = require("../models/Users");
const { createAuth } = require("../controller/auth");
const Auth = require("../models/Auth");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.json({ message: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.username });

    if (user === null) {
      res.json({
        responseCode: "01",
        responseMessage: "No record found",
      });
      //   return;
    }

    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  const user = new Users({ firstName, lastName, phoneNumber, email });

  let auth = new Auth();
  auth.username = email;
  auth.password = req.body.password;
  auth.setPassword(req.body.password);

  try {
    // const authCall = await createAuth(auth, res);

    // if (authCall.responseCode != "00") {
    //   return res.status(400).json({
    //     responseCode: "01",
    //     responseMessage: "User Profile creation failed",
    //     error: authCall.err,
    //   });
    // }

    const userSave = await user.save();
    

    res.json({
      responseCode: "00",
      responseMessage: "User created successfully",
      data: userSave,
    });
  } catch (err) {
    return res.json({
      responseCode: "01",
      responseMessage: `User creation failed ${err}`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    await Users.updateOne(
      { _id: req.params.dogId },
      { $set: { price: req.body.price } }
    );
    res.json({
      responseCode: "00",
      responseMessage: "Data updated successfully",
      data: {},
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const dogs = await Users.deleteOne({ _id: req.params.dogId });
    res.json({
      responseCode: "00",
      responseMessage: "Data deleted successfully",
      data: dogs,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

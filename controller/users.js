const Users = require("../models/Users");
const { createAuth } = require("../controller/auth");
const Auth = require("../models/Auth");
const Role = require("../uitls/constants");

const getUsers = async (req, res) => {
  try {
    let users = await Users.find()
      .lean()
      .populate("auth")
      .populate({ path: "address", select: "street -_id" });

    for (i = 0; i < users.length; i++) {
      const user = users[i];
      users[i].lastLogin = user.auth.lastLogin;
    }

    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  const user = req.user;

  //Check if this user has the right to access this resource.
  if (userId !== user.userId && user.role !== Role.Admin) {
    return res.json({
      responseCode: "01",
      responseMessage: "You do not have access to this resources",
    });
  }

  try {
    const user = await Users.findOne({ _id: userId });

    if (!user) {
      res.json({
        responseCode: "01",
        responseMessage: "No record found",
      });
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
  const { firstName, lastName, phoneNumber, email, role } = req.body;

  let auth = new Auth();
  auth.username = email;
  auth.password = req.body.password;
  auth.setPassword(req.body.password);
  auth.role = role;

  try {
    const authCall = await createAuth(auth, res);

    if (authCall.responseCode != "00") {
      return res.status(400).json({
        responseCode: "01",
        responseMessage: "User Profile creation failed",
        error: authCall.err,
      });
    }

    const user = new Users({
      firstName,
      lastName,
      phoneNumber,
      email,
      auth: authCall.id,
    });

    const userSave = await user.save();

    res.json({
      responseCode: "00",
      responseMessage: "User created successfully",
      role: authCall.role,
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
  const userId = req.params.userId;
  const user = req.user;

  //Check if this user has the right to access this resource.
  if (userId !== user.userId && user.role !== Role.Admin) {
    return res.json({
      responseCode: "01",
      responseMessage: "You do not have access to this resources",
    });
  }

  try {
    await Users.updateOne({ _id: userId }, { $set: { price: req.body.price } });
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
    const dogs = await Users.deleteOne({ _id: req.params.userId });
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

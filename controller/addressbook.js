const AddressBook = require("../models/AddressBook");
const { createAuth } = require("./auth");
const Users = require("../models/Users");
const Role = require("../uitls/constants");
const mongoose = require("mongoose");
const { AddressType } = require("../uitls/constants");

const getAllAddress = async (req, res) => {
  console.log(req.user);
  try {
    let users = await AddressBook.find().lean();

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

const getAddressById = async (req, res) => {
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

const addAdress = async (req, res) => {
  const { street, city, state, type } = req.body;
  const userId = req.user.userId;

  // if (userId !== user.userId && user.role !== Role.Admin) {

  // }

  const address = new AddressBook({
    street,
    city,
    state,
    type: type || AddressType.Secondary,
    _id: new mongoose.Types.ObjectId(),
  });
  address.user_id = userId;

  console.log(userId);

  try {
    const addressSave = await address.save();

    await Users.updateOne(
      { _id: userId },
      { $addToSet: { address: addressSave._id } }
    );
    res.json({
      responseCode: "00",
      responseMessage: "Address book updated successfully",
      data: addressSave ,
    });
  } catch (err) {
    return res.json({
      responseCode: "01",
      responseMessage: `Unable to add address ${err}`,
    });
  }
};

const updateAddress = async (req, res) => {
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

const deleteAddress = async (req, res) => {
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
  getAllAddress,
  getAddressById,
  addAdress,
  updateAddress,
  deleteAddress,
};

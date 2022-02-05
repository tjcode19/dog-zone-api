const express = require("express");

const router = express.Router();
const Users = require("../models/Users");

//Get all Users
router.get("/", async (req, res) => {
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
});

//Get a user by ID
router.get("/:username", async (req, res) => {
  try {
    const user = await Users.findById(req.params.dogId);

    var len = user.length;

    console.log("log if here 2" + len);

    if (dog.length < 1) {
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
});

//Save new user
router.post("/", async (req, res) => {
  const user = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  });

  try {
    const userSave = await user.save();

    res.json({
      responseCode: "00",
      responseMessage: "Data added successfully",
      data: userSave,
    });
  } catch (err) {
    res.json({ 
      responseCode: "01",
      responseMessage: "Failed saving new user",
      message: err.key });
  }
});

//Delete a dog by ID
router.delete("/:dogId", async (req, res) => {
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
});

//Update a dog by ID
router.patch("/:dogId", async (req, res) => {
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
});

module.exports = router;

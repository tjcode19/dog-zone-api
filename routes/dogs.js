const express = require("express");

const router = express.Router();
const Dogs = require("../models/Dogs");

//Get all dogs
router.get("/", async (req, res) => {
  try {
    const dogs = await Dogs.find();
    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: dogs,
    });
  } catch (error) {
    res.json({ message: err });
  }
});

//Get a dog by ID
router.get("/:dogId", async (req, res) => {
  try {
    const dog = await Dogs.findById(req.params.dogId);

    if (dog == null) {
      res.json({
        responseCode: "01",
        responseMessage: "No record found",
      });
      return;
    }

    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: dog,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//Post dog data
router.post("/", async (req, res) => {
  const dog = new Dogs({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const dogSave = await dog.save();

    res.json({
      responseCode: "00",
      responseMessage: "Data added successfully",
      data: dogSave,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a dog by ID
router.delete("/:dogId", async (req, res) => {
  try {
    const dogs = await Dogs.deleteOne({ _id: req.params.dogId });
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
    const update = await Dogs.updateOne(
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

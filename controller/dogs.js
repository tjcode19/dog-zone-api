const Dogs = require("../models/Dogs");

const getDogs = async (req, res) => {
  const { search, limit } = req.query;

  try {
    const dogs = await Dogs.find().lean();

    let sortedList = [...dogs];

    if (search) {
      sortedList = sortedList.filter((dog) => {
        return dog.name.startsWith(search);
      });
    }

    if (limit) {
      sortedList = sortedList.slice(0, Number(limit));
    }

    if (sortedList.length < 1) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "No record found",
      });
    }

    const newDogs = sortedList.map((dog) => {
      const { _id, name } = dog;
      return { _id, name };
    });

    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: newDogs,
    });
  } catch (error) {
    res.json({ message: err });
  }
};

const getDogById = async (req, res) => {
  try {
    const dog = await Dogs.findById(req.params.dogId);

    if (dog == null) {
      res.status(404).json({
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
};

const createDog = async (req, res) => {
  const { name, price } = req.body;
  const dog = new Dogs({ name, price });

  if (!name || !price) {
    return res.status(400).json({
      responseCode: "01",
      responseMessage: "Please provide Name and Price",
    });
  }

  try {
    const dogSave = await dog.save();

    res.status(201).json({
      responseCode: "00",
      responseMessage: "Data added successfully",
      data: dogSave,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteDog = async (req, res) => {
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
};

const updateDog = async (req, res) => {
  try {
    const update = await Dogs.updateOne(
      { _id: req.params.dogId },
      { $set: req.params }
    );
    res.json({
      responseCode: "00",
      responseMessage: "Data updated successfully",
      data: update,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = { getDogs, getDogById, createDog, updateDog, deleteDog };

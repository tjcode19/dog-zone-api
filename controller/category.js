const ProductCate = require("../models/ProductCategories");
const Users = require("../models/Users");
const Role = require("../uitls/constants");
const mongoose = require("mongoose");
const { AddressType } = require("../uitls/constants");

const getAllCate = async (req, res) => {
  try {
    const cate = await ProductCate.find().select("name show").lean();

    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: cate,
    });
  } catch (err) {
    console.log(err);
    res.json({
      responseCode: "01",
      responseMessage: "Unable to retrieve data",
    });
  }
};

const getCateId = async (req, res) => {
  const cateId = req.params.userId;
  const user = req.user;

  //Check if this user has the right to access this resource.
  if (user.role !== Role.Basic) {
    try {
      const cate = await ProductCate.findOne({ _id: cateId });

      if (!cate) {
        return res.status(404).json({
          responseCode: "01",
          responseMessage: "No record found",
        });
      }

      res.status(201).json({
        responseCode: "00",
        responseMessage: "Data retrieved successfully",
        data: cate,
      });
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    return res.json({
      responseCode: "01",
      responseMessage: "You do not have access to this resources",
    });
  }
};

const addCategory = async (req, res) => {
  const { name, show } = req.body;

  try {
    const cate = new ProductCate({
      name,
      show,
      _id: new mongoose.Types.ObjectId(),
    });
    cate.save();

    res.json({
      responseCode: "00",
      responseMessage: "Category added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      responseCode: "01",
      responseMessage: "Unable to add category",
      data: err,
    });
  }
};

const updateCate = async (req, res) => {
  const user = req.user;
  const cateId = req.params.cateId;

  const  bodyData  = req.body;

  console.log(bodyData);

  //Check if this user has the right to access this resource.
  if (user.role !== Role.Basic) {
    try {
      await ProductCate.updateOne({ _id: cateId }, { $set:  bodyData });
      res.json({
        responseCode: "00",
        responseMessage: "Data updated successfully",
        data: {},
      });
    } catch (err) {
      res.json({
        responseCode: "01",
        responseMessage: "Unable to update at the moment",
        responseDetails: err,
      });
    }
  } else {
    return res.json({
      responseCode: "01",
      responseMessage: "You do not have access to this resources",
    });
  }
};

const deleteCate = async (req, res) => {
  try {
    const cate = await ProductCate.deleteOne({ _id: req.params.cateId });

    console.log(cate);
    res.json({
      responseCode: "00",
      responseMessage: "Category deleted successfully",
    });
  } catch (err) {
    // res.json({ message: err });
    return res.json({
      responseCode: "01",
      responseMessage: "Unable to delete category, check the cate id passed",
    });
  }
};

module.exports = {
  getAllCate,
  getCateId,
  addCategory,
  updateCate,
  deleteCate,
};

const express = require("express");

const router = express.Router();
const authenticationMiddleware = require("../middlewares/auth");

const {
  getAllCate,
  getCateId,
  addCategory,
  updateCate,
  deleteCate,
} = require("../controller/category");

try {
  //Get all category
  router.route("/").get(authenticationMiddleware, getAllCate);
  //Get a cate by ID
  router.route("/:cateId").get(authenticationMiddleware, getCateId);
  //Post category data
  router.route("/").post(authenticationMiddleware, addCategory);
  //Delete a product by ID
  router.route("/:cateId").delete(authenticationMiddleware, deleteCate);
  //Update a product by ID
  router.route("/:cateId").patch(authenticationMiddleware, updateCate);
} catch (e) {}

module.exports = router;

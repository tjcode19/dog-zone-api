const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/products");

const {
  getAllCate,
  getCateId,
  addCategory,
  updateCate,
  deleteCate
} = require("../controller/category");

//Get all dogs
router.get("/", getProducts);
//Get a product by ID
router.get("/:productId", getProductById );
//Post product data
router.post("/", createProduct);
//Delete a product by ID
router.delete("/:productId", deleteProduct);
//Update a product by ID
router.patch("/:productId", updateProduct);


//Get all category
router.get("/category/", getAllCate);
//Get a cate by ID
router.get("/category/:cateId", getCateId );
//Post category data
router.post("/category", addCategory);
//Delete a product by ID
router.delete("/category/:cateId", deleteCate);
//Update a product by ID
router.patch("/category/:cateId", updateCate);

module.exports = router;

const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getDogBreed
} = require("../controller/products");


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


router.get("/dog/breeds", getDogBreed);



module.exports = router;

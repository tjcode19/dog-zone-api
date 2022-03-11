const Products = require("../models/Product");

const getProducts = async (req, res) => {
  const { search, limit } = req.query;

  try {
    const Products = await Products.find().lean();

    let sortedList = [...Products];

    if (search) {
      sortedList = sortedList.filter((Product) => {
        return Product.name.startsWith(search);
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

    const newProducts = sortedList.map((Product) => {
      const { _id, name } = Product;
      return { _id, name };
    });

    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: newProducts,
    });
  } catch (error) {
    res.json({ message: err });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.productId);

    if (product == null) {
      res.status(404).json({
        responseCode: "01",
        responseMessage: "No record found",
      });
      return;
    }

    res.json({
      responseCode: "00",
      responseMessage: "Data retrieved successfully",
      data: product,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const createProduct = async (req, res) => {
  const { name, price } = req.body;
  const product = new Products({ name, price });

  if (!name || !price) {
    return res.status(400).json({
      responseCode: "01",
      responseMessage: "Please provide Name and Price",
    });
  }

  try {
    const productSave = await product.save();

    res.status(201).json({
      responseCode: "00",
      responseMessage: "Data added successfully",
      data: productSave,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const products = await Products.deleteOne({ _id: req.params.productId });
    res.json({
      responseCode: "00",
      responseMessage: "Data deleted successfully",
      data: products,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const updateProduct = async (req, res) => {
  try {
    const update = await Products.updateOne(
      { _id: req.params.productId },
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

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

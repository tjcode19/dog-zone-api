const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
  colour: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);

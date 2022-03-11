const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  // dog_category_id, 
  colour: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
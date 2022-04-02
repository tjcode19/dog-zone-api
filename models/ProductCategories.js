const mongoose = require("mongoose");

const ProductCateSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    show: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", ProductCateSchema);

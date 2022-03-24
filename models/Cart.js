const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  user_id: {
    type: String,
    require: true,
  },
  price:Number,
  quantity: Number,
},  { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);

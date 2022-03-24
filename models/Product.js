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
    type:Object,
    base: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
    },
    discount: mongoose.Schema.Types.Decimal128,
    currency: {
      type: String,
      default: "NGN",
      enum: ["USD", "NGN"],
    },
    required: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
  options: {
    age: Number,
    features: [{type:String}],
    colour: [{tye:String}],
  },
  quantity: Number,
  createdDate: {
    type: Date,
    default: Date.now,
  },
},  { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);

const mongoose = require("mongoose");

const { OrderStatus } = require("../uitls/constants");

const OrderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    SKU: {
      type: String,
      required: true,
    },
    paymentId: String,
    paymentStatus: String,
    currency:String,
    status: {
      type: String,
      default: OrderStatus.newOrder,
      enum: [
        OrderStatus.newOrder,
        OrderStatus.confirmed,
        OrderStatus.fulfilled,
        OrderStatus.shipped,
        OrderStatus.outForDelivery,
        OrderStatus.delivered,
      ],
    },
    totalCost: mongoose.Schema.Types.Decimal128,
    items: [
      {
        sku: String,
        quantity: Number,
        price: mongoose.Schema.Types.Decimal128,
        discount: mongoose.Schema.Types.Decimal128,
        totalBeforeTax: mongoose.Schema.Types.Decimal128,
        tax: mongoose.Schema.Types.Decimal128,
        totalWithTax: mongoose.Schema.Types.Decimal128,
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    productDetails:{type:Object},
    user_id,
    quantity:Number
});


module.exports = mongoose.model('Cart', CartSchema);
const mongoose = require('mongoose');


const ProductCateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String
});

module.exports = mongoose.model('ProductCategory', ProductCateSchema);
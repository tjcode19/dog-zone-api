const mongoose = require('mongoose');


const ProductCateSchema = mongoose.Schema({
    id:Number,
    name:String
});

module.exports = mongoose.model('ProductCategory', ProductCateSchema);
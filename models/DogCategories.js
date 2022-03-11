const mongoose = require('mongoose');


const DogCat = mongoose.Schema({
    id:Number,
    name:String
});

module.exports = mongoose.model('DogCategory', DogCat);
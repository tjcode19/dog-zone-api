const mongoose = require('mongoose');


const AddressBookSchema = mongoose.Schema({
    id:Number,
    name:String
});

module.exports = mongoose.model('AddressBook', AddressBookSchema);
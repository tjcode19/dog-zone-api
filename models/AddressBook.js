const mongoose = require("mongoose");

const { AddressType } = require("../uitls/constants");

const AddressBookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  street: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  user_id: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    default: Role.Secondary,
    enum: [AddressType.Primary, AddressType.Secondary, AddressType.Office],
  },
  business_name:{type: String}
},  { timestamps: true });

module.exports = mongoose.model("AddressBook", AddressBookSchema);

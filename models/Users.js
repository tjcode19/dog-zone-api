const { validateEmail } = require("../uitls/utils");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,

    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  auth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: "AddressBook" }],
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "Email must be unique"],
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
});

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
  id: Number,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  token:String,
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Auth", AuthSchema);
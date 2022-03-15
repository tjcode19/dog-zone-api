const mongoose = require("mongoose");
var crypto = require("crypto");
const { Role } = require("../uitls/constants");

const AuthSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: String,
    role: {
      type: String,
      default: Role.Basic,
      enum: [Role.Basic, Role.Seller, Role.Admin],
    },
    salt: {
      type: String,
      require: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    // createdDate: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

AuthSchema.methods.setPassword = function (password) {
  console.log(password);
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
AuthSchema.methods.validPassword = function (password) {
  if (!this.salt) {
    return false;
  }
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return this.password === hash;
};

module.exports = mongoose.model("Auth", AuthSchema);

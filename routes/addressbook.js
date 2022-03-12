const express = require("express");

const router = express.Router();
const {Role} = require("../uitls/constants");

const authenticationMiddleware = require("../middlewares/auth");
const { grantAccess } = require("../middlewares/authorize");

const {
  getAllAddress,
  getAddressById,
  addAdress,
  updateAddress,
  deleteAddress,
} = require("../controller/addressbook");

//Get all Users
router
  .route("/")
  .get(authenticationMiddleware, grantAccess([Role.Admin]), getAllAddress);

//Get a user by ID
router.route("/:addressId").get(authenticationMiddleware, grantAccess([Role.Basic, Role.Seller, Role.Admin]), getAddressById);

//Save new user
router.route("/").post(authenticationMiddleware, addAdress);

//Delete a user by ID
router.route("/:addressId").delete(authenticationMiddleware, grantAccess([Role.Basic, Role.Seller, Role.Admin]), deleteAddress);

//Update a user by ID
router.route("/:addressId").patch(authenticationMiddleware, grantAccess([Role.Basic, Role.Seller, Role.Admin]), updateAddress);

module.exports = router;

const express = require("express");

const router = express.Router();
const {Role} = require("../uitls/constants");

const authenticationMiddleware = require("../middlewares/auth");
const { grantAccess } = require("../middlewares/authorize");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

//Get all Users
router
  .route("/")
  .get(authenticationMiddleware, grantAccess([Role.Admin]), getUsers);

//Get a user by ID
router.route("/:userId").get(authenticationMiddleware, grantAccess([Role.Basic, Role.Seller, Role.Admin]), getUserById);

//Save new user
router.route("/").post(createUser);

//Delete a user by ID
router.route("/:userId").delete(authenticationMiddleware, grantAccess([Role.Admin]), deleteUser);

//Update a user by ID
router.route("/:userId").patch(authenticationMiddleware, grantAccess([Role.Basic, Role.Seller, Role.Admin]), updateUser);

module.exports = router;

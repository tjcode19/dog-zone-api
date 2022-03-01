const express = require("express");

const router = express.Router();

const authenticationMiddleware = require("../middlewares/auth");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

//Get all Users
router.route("/").get(authenticationMiddleware, getUsers);

//Get a user by ID
router.route("/:username").get(authenticationMiddleware, getUserById);

//Save new user
router.route("/").post(authenticationMiddleware, createUser);

//Delete a user by ID
router.route("/:username").delete(authenticationMiddleware, deleteUser);

//Update a user by ID
router.route("/:username").patch(authenticationMiddleware, updateUser);

module.exports = router;

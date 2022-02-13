const express = require("express");

const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

//Get all Users
router.get("/", getUsers);

//Get a user by ID
router.get("/:username", getUserById);

//Save new user
router.post("/", createUser);

//Delete a user by ID
router.delete("/:username", deleteUser);

//Update a user by ID
router.patch("/:dogId", updateUser);

module.exports = router;

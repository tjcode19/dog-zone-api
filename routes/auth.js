const express = require("express");

const router = express.Router();

const { login, createAuth, resetPassword } = require("../controller/auth");
const authenticationMiddleware = require("../middlewares/auth");

//Authentication routes
router.post("/login", login);
router.post("/create", createAuth);
router.route("/reset-password").post(authenticationMiddleware, resetPassword);

module.exports = router;

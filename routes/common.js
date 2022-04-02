const express = require("express");

const router = express.Router();

const { sendOtp, verifyOtp } = require("../controller/utils");
const authenticationMiddleware = require("../middlewares/auth");

//Authentication routes
router.post("/send-otp", sendOtp);
router.route("/verify-otp/:otp").get(authenticationMiddleware, verifyOtp);
// router.route("/reset-password").post(authenticationMiddleware, resetPassword);
// router.route("/change-password").post(authenticationMiddleware, changePassword);

module.exports = router;

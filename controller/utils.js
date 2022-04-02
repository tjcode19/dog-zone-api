const {
  sendEmail,
  generateOTP,
  generateAccessToken,
} = require("../uitls/utils");

const { sendOtpTemp } = require("../html_temp/send_otp_temp");
const User = require("../models/Users");
var inlineCss = require("inline-css");
const { use } = require("express/lib/application");

const sendOtp = async (req, res) => {
  const { phone, email } = req.body; //destructure to get phone and email

  //check if either phone or email is set else return error and terminate process
  if (!email && !phone) {
    return res.status(400).json({
      responseCode: "01",
      responseMessage: "Please set email or phone number",
    });
  }

  let msg;
  //generate OTP
  const otpCode = generateOTP(6);

  //If email and Phone were set, send otp to email and phone
  if (phone && email) {
    const resDB = await updateDB({ email, phone, otpCode, res });
    if (resDB.code !== "00") {
      return res.status(401).json({
        responseCode: "01",
        responseMessage: resDB.msg,
      });
    }

    const resP = await sentPhoneOtp(otpCode);
    const resE = await sentEmailOtp(otpCode);

    if (resP && resE) {
      msg = {
        responseCode: "00",
        responseMessage: "Otp sent to phone and email",
      };
    } else if (!resP && resE) {
      msg = {
        responseCode: "001",
        responseMessage: "Otp to phone failed",
        responseDetails: "Otp to email successful but to phone failed",
      };
    } else if (!resE && resP) {
      msg = {
        responseCode: "001",
        responseMessage: "Otp to email failed",
        responseDetails: "Otp to phone successful but to email failed",
      };
    }
  } else if (email) {
    //Send to only email because only email is set
    const resDB = await updateDB({ email, otpCode, res });
    if (resDB.code !== "00") {
      return res.status(401).json({
        responseCode: "01",
        responseMessage: resDB.msg,
      });
    }
    const resE = await sentEmailOtp(otpCode);
    if (resE) {
      msg = {
        responseCode: "00",
        responseMessage: "Otp sent to email",
        data: {
          token: resDB.token,
        },
      };
    }
  } else {
    //Send to only phone because only phone is set
    const resDB = await updateDB({ phone, otpCode, res });
    if (resDB.code !== "00") {
      return res.status(401).json({
        responseCode: "01",
        responseMessage: resDB.msg,
      });
    }
    const resP = await sentPhoneOtp(otpCode);
    if (resP) {
      msg = {
        responseCode: "00",
        responseMessage: "Otp sent to phone",
      };
    }
  }

  res.status(200).json(msg);
};

const updateDB = async ({ email, phone, otpCode, res }) => {
  let filter;
  let name;
  if (email && phone) {
    filter = { email, phoneNumber: phone };
    name = "Email or Phone";
  } else if (email) {
    filter = { email };
    name = "Email";
  } else {
    filter = { phoneNumber: phone };
    name = "Phone number";
  }
  try {
    const user = await User.findOne(filter).populate("auth");

    if (!user) {
      return {
        code: "01",
        msg: `User with this ${name} does not exist`,
      };
    }

    const token = generateAccessToken({
      userId: user._id,
      role: user.auth.role,
      otp: otpCode,
    });

    //Set new password
    user.auth.token = otpCode;
    //Save the change.
    await user.auth.save();

    return {
      code: "00",
      msg: `Operation successful`,
      token: token,
    };
  } catch (err) {
    return {
      code: "01",
      msg: "Operation failed",
    };
  }
};

const sentEmailOtp = async (code) => {
  var html = sendOtpTemp({ otp: code });

  inlineCss(html, { url: "fake" }).then(function (htm) {
    html = htm;
  });

  const response = await sendEmail({
    to: ["tjcode19@gmail.com"],
    subject: "Reset Password Otp",
    htmlBody: html,
  });

  if (response.code === "00") {
    return true;
  } else {
    return false;
  }
};

const sentPhoneOtp = async (code) => {
  return true;
};

const verifyOtp = async (req, res) => {
  const otp = req.params.otp;
  const otpU = req.user.otp;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];


  if (otpU === otp) {

    return res.status(200).json({
      responseCode: "00",
      responseMessage: "OTP validated successfully",
      data: {
        token: token,
      },
    });
  } else {
    return res.status(400).json({
      responseCode: "01",
      responseMessage: "Invalid OTP",
    });
  }

};

module.exports = { sendOtp, verifyOtp };

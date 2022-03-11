const jwt = require("jsonwebtoken");


const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const generateAccessToken = function ({userId, role}) {
  return jwt.sign({userId, role}, process.env.JWT_SECRET, { expiresIn: "30d" });
};



module.exports = {
  validateEmail,
  generateAccessToken
};

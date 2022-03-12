const jwt = require("jsonwebtoken");

const { ResponseDetails } = require("../uitls/constants");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json(ResponseDetails.TokenNotProvided);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json(ResponseDetails.InvalidToken);

    req.user = user;

    next();
  });
};

module.exports = authenticationMiddleware;

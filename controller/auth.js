const Auth = require("../models/Auth");
const Users = require("../models/Users");
const User = require("../models/Users");

const { generateAccessToken } = require("../uitls/utils");

const login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const token = generateAccessToken({ username: username });

  if (!username || !password) {
    return res.status(400).json({
      responseCode: "01",
      responseMessage: "Please provide username and password",
    });
  }

  try {
    const auth = await Auth.findOne({ username: username });

    if (!auth) {
      return res.status(404).json({
        responseCode: "01",
        responseMessage: "User does not exist",
      });
    }
    if (!auth.validPassword(password)) {
      return res.status(400).json({
        responseCode: "01",
        responseMessage: "Wrong Password",
      });
    }

    // const { firstName, lastName, email } = await Users.findOne({
    //   email: username,
    // });

    res.status(200).json({
      responseCode: "00",
      responseMessage: "Login was successful",
      data: {
        // token: token,
        // firstName: firstName,
        // lastName: lastName,
        // username: email,
      },
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const createAuth = async (req, res) => {
  const { username, password, salt } = req;
  const auth = new Auth({ username, password, salt });

  try {
    await auth.save();

    const resp = {
      responseCode: "00",
      responseMessage: "User creation successful",
    };

    return resp;
  } catch (err) {
    const resp = {
      responseCode: "01",
      responseMessage: "User creation failed",
      err:
        err.name === "MongoServerError" && err.code === 11000
          ? "Email already exist"
          : "Oops, something went wrong",
    };

    return resp;
  }
};

module.exports = { login, createAuth };

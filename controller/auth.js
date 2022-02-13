const Auth = require("../models/Auth");

const login = async (req, res) => {
  const { username, password } = req.body;

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

    res.status(200).json({
      responseCode: "00",
      responseMessage: "Login was successful",
      data: {},
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

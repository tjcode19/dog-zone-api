const Auth = require('../models/Auth')



const login = async (req, res) => {
    const { username, password } = req.body;
    const dog = new Auth({ username, password });
  
    if (!username || !password ) {
      return res.status(400).json({
        responseCode: "01",
        responseMessage: "Please provide valid credentials",
      });
    }
  
    try {
      const apiCall = await dog.save();
  
      res.status(201).json({
        responseCode: "00",
        responseMessage: "Login was successful",
        data: {},
      });
    } catch (err) {
      res.json({ message: err });
    }
  };
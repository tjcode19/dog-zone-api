const express = require("express");

const router = express.Router();

const {login} = require('../controller/auth')



//Post dog data
router.post("/login", login );

module.exports = router;
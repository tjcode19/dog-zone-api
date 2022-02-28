const express = require("express");

const router = express.Router();

const {login, createAuth} = require('../controller/auth')



//Post dog data
router.post("/login", login );

router.post("/create",  createAuth );

module.exports = router;
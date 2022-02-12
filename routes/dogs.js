const express = require("express");

const router = express.Router();

const {getDogs, getDogById, createDog, updateDog, deleteDog} = require('../controller/dogs')


//Get all dogs
router.get("/", getDogs );

//Get a dog by ID
router.get("/:dogId", getDogById );

//Post dog data
router.post("/", createDog );

//Delete a dog by ID
router.delete("/:dogId", deleteDog );

//Update a dog by ID
router.patch("/:dogId", updateDog );

module.exports = router;

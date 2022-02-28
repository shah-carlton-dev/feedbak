const express = require("express");
const ObjectId = require("mongodb").ObjectId;

// connect to db
const dbo = require("../db/conn");

const usersRouter = express.Router();

// get all users
usersRouter.route("/all").get(function (req, res) {
  
});

// get user by id
usersRouter.route("/:id").get(function (req, res) {
  
});

// create new user
usersRouter.route("/new").post(function (req, response) {
  
});

// update user by id
usersRouter.route("/update/:id").put(function (req, response) {
 
});

// delete user by id
usersRouter.route("/:id").delete((req, response) => {
});

module.exports = usersRouter;
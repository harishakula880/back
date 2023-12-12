const express = require("express");
const cors = require("cors");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const usersController = require("../controllers/usersController");

router.post(
  "/signup",
  body("username").isLength({ min: 4 }),
  body("incubatorNumber").isNumeric().isLength({min: 1}),
  body("password").isLength({min:8}),
  usersController.signupHandler
);

router.post(
  "/login", 
  body("incubatorNumber").isLength({ min: 1}),
  body("password").isLength({min:8}),
  usersController.loginHandler
);


module.exports=router;
const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupHandler = async (req, res, next) => {
  const { incubatorNumber, username, password, secretkey } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({
      message: "Input Validation Failed!",
    });
  }
  if (secretkey !== "Harishnaidu@143") {
    res.status(401).json({
      message: "Invalid Secret Key",
    });
  }
 
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }

  let userExists = false;

  try {
    const userdata = await User.find({ incubatorNumber: incubatorNumber});   
    if (userdata.length != 0) {
      userExists = true;
    }                   
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
  if (userExists) {
    res.status(401).json({
      message: "User Already Exists!",
    });
  }

  const newUser = new User({
    incubatorNumber,
    username,
    password: hashedPassword,
  });

  try {
    newUser.save();
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
  res.status(200).json({
    message: "User Created Successfully!",
  });
};

const loginHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({
      message: "Input Validation Failed!",
    });
  }
  const { incubatorNumber, password } = req.body;
  let existinguser = [];
  try {
    existinguser = await User.find({ incubatorNumber });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
  if (existinguser.length === 0) {
    res.status(401).json({
      message: "Invalid Roll Number",
    });
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existinguser[0].password);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
  if (!isValidPassword) {
    res.status(401).json({
      message: "Invalid Password",
    });
  }
  let token;
  try {
    token = jwt.sign(
      {
        username: existinguser[0].username,
        incubatorNumber
      }, "mysecret",
      { expiresIn: "1h" });     
  } catch (err) {  
    res.status(500).json({   
      message: "Internal Server Error!",
    });                        
  }
  res.status(200).json({
    username: existinguser[0].username,
    incubatorNumber,
    token,
    message: "Login successful!",
  });
};

exports.signupHandler = signupHandler;
exports.loginHandler = loginHandler;
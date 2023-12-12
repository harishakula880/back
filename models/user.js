const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    incubatorNumber: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User",userSchema);
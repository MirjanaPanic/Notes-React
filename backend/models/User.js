const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 20,
    required: true,
    unique: true,
    trim: true, //removes whitespaces at the start and at the end of the string
  },
  passwordHash: {
    type: String,
    minlength: 60, //bcrypt transform plaintext password into 60 characters hash string value
    maxlength: 60,
    required: true,
  },
});

//making a collection called "users" in database
//"User" is a programming reference to "users" collection in database
module.exports = mongoose.model("User", userSchema);

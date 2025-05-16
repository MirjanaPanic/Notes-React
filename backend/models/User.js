const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 20,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    minlength: 60,
    maxlength: 60,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);

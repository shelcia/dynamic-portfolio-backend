const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  type: {
    type: String,
    required: true,
  },
  portfolios: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

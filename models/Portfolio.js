const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  image: {
    type: Buffer,
  },
  name: {
    type: String,
  },
  headerTitle: {
    type: String,
  },
  about: {
    type: String,
  },
  skills: {
    type: Array,
  },
  exp: {
    type: Array,
  },
  projects: {
    type: Array,
  },
  socialLinks: {
    type: Array,
  },
  theme: {
    type: String,
    default: "greenishblue",
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;

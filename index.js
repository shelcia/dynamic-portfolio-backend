const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

//JSON WEB TOKEN REQUISITIES
const jwt = require("jsonwebtoken");
const verify = require("./verify");

const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;

//VALIDATION OF USER INPUTS PREREQUISITES

const Joi = require("joi");

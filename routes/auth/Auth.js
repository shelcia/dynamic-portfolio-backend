const router = require("express").Router();
const bcrypt = require("bcryptjs");

//IMPORT MODELS

const User = require("../../models/User");

//JSON WEB TOKEN REQUISITIES
const jwt = require("jsonwebtoken");

//VALIDATION OF USER INPUTS PREREQUISITES

const Joi = require("joi");

//AUTHORISATION RELATED API

//REGISTER SCHEMA
const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  type: Joi.string().required(),
});

//LOGIN SCHEMA
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  //CHECK IF MAIL ALREADY EXISTS

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(200).send({ status: "400", message: "Email Already Exists" });
    return;
  }

  //HASHING THE PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //CREATE TOKENS

  const token = jwt.sign(
    { email: req.body.email, type: req.body.type },
    process.env.TOKEN_SECRET
  );

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    type: req.body.type,
    token: token,
    portfolios: [],
  });

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await registerSchema.validateAsync(req.body);
    if (error) {
      res.status(200).send({ status: "400", message: error });
      return;
    }
    //THE USER IS ADDED
    else {
      await user.save();
      res.status(200).send({ status: "200", message: "User Created" });
    }
  } catch (error) {
    res.status(200).send({ status: "400", message: "Internal Server Error" });
  }
});

//SIGNIN USER

router.post("/signin", async (req, res) => {
  //CHECKING IF EMAIL EXISTS

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).send({ status: "400", message: "Email doesn't exist" });
    return;
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    res.status(200).send({ status: "400", message: "Incorrect Password !!!" });
    return;
  }

  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) {
      res.status(200).send({ status: "400", message: error });
      return;
    } else {
      res
        .status(200)
        .header("auth-token", user.token)
        .send({
          status: "200",
          message: { userId: user._id, name: user.name, token: user.token },
        });
    }
  } catch (error) {
    res.status(200).send({ status: "400", message: "Internal Server Error" });
  }
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer"); //importing node mailer

const Cryptr = require("cryptr");
const cryptr = new Cryptr("sdfop");

//IMPORT MODELS

const User = require("../../models/User");

//JSON WEB TOKEN REQUISITIES
const jwt = require("jsonwebtoken");

//VALIDATION OF USER INPUTS PREREQUISITES

const Joi = require("joi");
const emailTemp = require("../../templates/verifyMail");

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

      // res.status(200).send({ status: "200", message: "User Created" });

      const encryptedString = await cryptr.encrypt(hashedPassword);
      // console.log(process.env.EMAIL, process.env.PASSWORD);

      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const url = `https://dynamic-portfolio.netlify.app/verification/${encryptedString}`;
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: `Activation mail for Dynamic Portfolio`,
        html: emailTemp(req.body.name, url),
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          // res.status(401).send("error");
          res.status(200).send({ status: "401", message: "Error" });
        } else {
          console.log("Email sent: " + info.response);
          // res.status(200).send("Sent Successfully");
          res.status(200).send({ status: "200", message: "User Created" });
        }
      });
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

  if (!user.activated) {
    res
      .status(200)
      .send({ status: "400", message: "Account Verification Pending !!!" });
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
          message: {
            userId: user._id,
            name: user.name,
            token: user.token,
            activated: user.activated,
          },
        });
    }
  } catch (error) {
    res.status(200).send({ status: "400", message: "Internal Server Error" });
  }
});

router.put("/verification/:id", async (req, res) => {
  console.log(req.params.id);
  const decryptedString = cryptr.decrypt(req.params.id);
  // console.log(decryptedString);
  try {
    const query = await User.where({ password: decryptedString });
    const activate = await User.findById(query[0]._id).exec();
    activate.set({ activated: true });
    console.log("verified");
    await activate.save();
    res.status(200).send({ status: "200", message: "Account Verified !" });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

module.exports = router;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
const PORT = process.env.PORT || 4050;

//IMPORT ROUTES

const authRoute = require("./routes/auth/Auth");
const commonRoute = require("./routes/common/Common");

dotenv.config();

//CONNECTION TO DATABASE

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("connected to db")
);

//MIDDLEWARE

app.use(express.json(), cors());

//ROUTE MIDDLEWARE

app.use("/api/auth", authRoute);
app.use("/api/common", commonRoute);

app.get("/", (req, res) => {
  res.send(`<h1>Dynamic Portflio Backend</h1>`);
});

app.listen(PORT, () => console.log(`Server up and running at  ${PORT}`));

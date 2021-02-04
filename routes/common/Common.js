const router = require("express").Router();
const { handleImageUpload } = require("../../middleware/imgUpload");
const Portfolio = require("../../models/Portfolio");

router.get("/portfolios/:id", async (req, res) => {
  try {
    const result = await Portfolio.find({ userID: req.params.id }).exec();
    res.status(200).send({ status: "200", message: result });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});
router.get("/portfolio/:id", async (req, res) => {
  try {
    const result = await Portfolio.findById(req.params.id);
    res.status(200).send({ status: "200", message: result });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

router.get("/portfolio/image/:id", async (req, res) => {
  try {
    const result = await Portfolio.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(result.image);
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

router.post("/portfolio", async (req, res) => {
  const newPortfolio = new Portfolio({
    userID: req.body.userID,
    name: req.body.name,
    headerTitle: req.body.headerTitle,
    about: req.body.about,
    skills: req.body.skills,
    exp: req.body.exp,
    projects: req.body.projects,
    socialLinks: req.body.socialLinks,
    theme: req.body.theme,
    font: req.body.font,
  });

  try {
    await newPortfolio.save();
    res.status(200).send({ status: "200", message: "Portfolio Added" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

router.put("/portfolio/:id", handleImageUpload, async (req, res) => {
  let updatedPortfolio = req.body;

  if (req.file) updatedPortfolio.image = req.file.buffer;
  try {
    await Portfolio.findByIdAndUpdate(req.params.id, updatedPortfolio);
    res.status(200).send({ status: "200", message: "Portfolio Edited" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

module.exports = router;

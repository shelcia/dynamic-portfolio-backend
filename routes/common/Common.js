const router = require("express").Router();

const Portfolio = require("../../models/Portfolio");

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

module.exports = router;

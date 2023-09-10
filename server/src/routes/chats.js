const router = require("express").Router();
const { openai } = require("../config");

router.post("/", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL,
      messages: req.body,
    });
    res.json(response.data.choices[0].message);
  } catch (error) {
    res.status(error.code || error.status || 500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const { db } = require("../config");
const { collection, addDoc } = require("firebase/firestore");

router.post("/", async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "prompts"), req.body);
    res
      .status(201)
      .json({ message: "Created prompt successfully.", docId: docRef.id });
  } catch (error) {
    res.status(error.code || error.status || 500).json(error);
  }
});

module.exports = router;

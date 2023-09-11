const router = require("express").Router();
const { db } = require("../config");

router.post("/", async (req, res) => {
  try {
    const docRef = await db.collection("prompts").add(req.body);
    res
      .status(201)
      .json({ message: "Created prompt successfully.", docId: docRef.id });
  } catch (error) {
    res.status(error.code || error.status || 500).json(error);
  }
});

router.get("/library", async (req, res) => {
  try {
    const userId = req.user.uid;
    const userDoc = await db.collection("users").doc(userId).get();
    const promptReferences = userDoc.data().library || [];
    const libraryDocs = await Promise.all(
      promptReferences.map((ref) => ref.get())
    );

    // Convert the doc snapshots into data objects
    const prompts = libraryDocs.map((docSnapshot) => {
      if (docSnapshot.exists) {
        return docSnapshot.data();
      }
      return null; // Handle missing documents
    });
    res.status(200).json(prompts.filter((prompt) => prompt !== null));
  } catch (error) {
    res.status(error.code || error.status || 500).json(error);
  }
});

module.exports = router;

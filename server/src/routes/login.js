const router = require("express").Router();
const {
  signInWithEmailAndPassword,
  OAuthProvider,
  signInWithPopup,
} = require("firebase/auth");

router.post("/", async (req, res) => {
  try {
    let authResult;
    if (req.query.useGoogle) {
      // Login with Google OAuth
      const googleProvider = new OAuthProvider("google.com");
      authResult = await signInWithPopup(auth, googleProvider);
    } else {
      const { email, password } = req.body;
      authResult = await signInWithEmailAndPassword(auth, email, password);
    }
    const userId = authResult.user.uid;
    const token = sign({ userId }, process.env.SECRET_KEY, { expiresIn: "4h" });
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json(error);
  }
});

module.exports = router;

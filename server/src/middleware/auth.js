const admin = require("firebase-admin");

// Middleware to verify Firebase Authentication token and extract user ID
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(token.replace("Bearer ", ""));
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Use the middleware before your protected routes
module.exports = {
  verifyFirebaseToken,
};

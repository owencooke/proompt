const { Configuration, OpenAIApi } = require("openai");
const admin = require("firebase-admin");

const serviceAccount = require("../fb_admin_key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  db,
  openai,
};

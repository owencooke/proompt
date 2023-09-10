const { Configuration, OpenAIApi } = require("openai");
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
// const analytics = getAnalytics(firebaseApp);

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  firebaseApp,
  auth,
  db,
  // analytics,
  openai,
};

const express = require("express");
const cors = require("cors");

const app = new express();

// Middleware
app.use(cors());
app.use(express.json());
const { verifyFirebaseToken } = require("./middleware/auth");
app.use(verifyFirebaseToken);

// Routes
app.use("/prompts", require("./routes/prompts"));
app.use("/chats", require("./routes/chats"));

module.exports = app;

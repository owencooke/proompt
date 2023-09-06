const express = require("express");
const cors = require("cors");

const app = new express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/prompts", require("./routes/prompts"));

module.exports = app;

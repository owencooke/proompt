const express = require("express");
const cors = require("cors");

const app = new express();

// Middleware
app.use(cors());

// Routes
app.use("/", require("./routes/messages"));

module.exports = app;

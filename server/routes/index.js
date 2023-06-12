const express = require("express");
const app = express();

const authMiddleware = require("../middleware/authMiddleware");

const authRouter = require("./authRouter");
const jobRouter = require("./jobRouter");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobRouter);

module.exports = app;

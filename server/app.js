const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const path = require("path");

const app = express();

// Security
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());   
app.use(xss());

app.use(express.static(path.resolve("./public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./public", "index.html"));
});

app.use(routes);

module.exports = app;

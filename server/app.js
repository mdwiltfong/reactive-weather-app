const express = require("express");

const app = express();

app.use(express.json());
app.get("/status", (req, res, next) => {
  res.send("connected");
});

app.get("/weather");

module.exports = app;

const express = require("express");
const weatherRoutes = require("./routes/weatherRoutes");
const app = express();

app.use(express.json());
app.get("/status", (req, res, next) => {
  res.send("connected");
});

app.use("/weather", weatherRoutes);

module.exports = app;

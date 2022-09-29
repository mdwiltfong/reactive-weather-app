const express = require("express");
const weatherRoutes = require("./routes/weatherRoutes");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
const { authenticateJWT } = require("./middleware/auth");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);
app.get("/status", (req, res, next) => {
  res.send("connected");
});

app.use("/weather", weatherRoutes);
app.use("/users", userRoutes);
module.exports = app;

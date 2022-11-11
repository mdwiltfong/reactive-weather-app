const express = require("express");
const weatherRoutes = require("./routes/weatherRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const morgan = require("morgan");
const { authenticateJWT } = require("./middleware/auth");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/status", (req, res, next) => {
  res.send("connected");
});

app.use("/weather", weatherRoutes);
app.use("/users", authenticateJWT, userRoutes);
app.use("/login", authenticateJWT, loginRoutes);
module.exports = app;

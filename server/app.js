const express = require("express");
const weatherRoutes = require("./routes/weatherRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const morgan = require("morgan");
const { authenticateJWT } = require("./middleware/auth");
const cors = require("cors");
const { ExpressError } = require("./ExpressError");
/* const path = require("path");
const publicPath = path.join(__dirname, "..", "build");
const filePath = path.join(publicPath, "index.html");
const app = express();
console.log(publicPath);
app.use(express.static(publicPath));
app.get("/*", (req, res) => {
  res.sendFile(filePath);
}); */
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/status", (req, res, next) => {
  res.send("connected");
});

app.use("/weather", weatherRoutes);
app.use("/users", authenticateJWT, userRoutes);
app.use("/login", loginRoutes);

app.use("/register", registerRoute);
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});
app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;
  console.error(err);
  return res.status(status).json({
    error: { message, status },
  });
});
module.exports = app;

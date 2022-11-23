const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const onecallroute = require("./mock_routes/onecallroute");
const weatherRoutes = require("./mock_routes/weatherRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.get("/mock_status", (req, res, next) => {
  res.send("mock server connected");
});

app.use("/data/3.0/onecall", onecallroute);
app.use("/data/2.5/weather", weatherRoutes);

module.exports = app;

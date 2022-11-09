const express = require("express");

const morgan = require("morgan");
const onecallroute = require("./mock_routes/onecallroute");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.get("/mock_status", (req, res, next) => {
  res.send("mock server connected");
});

app.use("/3.0", onecallroute);

module.exports = app;

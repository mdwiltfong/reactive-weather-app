const express = require("express");
require("dotenv").config({ path: ".env" });
console.log(process.env.PORT);
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/status", (req, res, next) => {
  res.send("connected");
});

app.get("/weather");

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

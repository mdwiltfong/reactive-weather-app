require("dotenv").config({ path: "../.env" });
const app = require("./app");
const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});

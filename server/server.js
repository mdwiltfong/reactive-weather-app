const dotenv = require("dotenv").config({ path: "./.env" });

const app = require("./app");
const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`App is on ${PORT}`);
});

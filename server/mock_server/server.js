const app = require("./app");
const PORT = 8000;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`App is on ${PORT}`);
});

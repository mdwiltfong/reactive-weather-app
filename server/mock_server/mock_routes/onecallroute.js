const express = require("express");
const router = new express.Router();
const MockData = require("../mock_data/MockData");
router.get("/", async (req, res, next) => {
  try {
    const { params } = req;
    console.debug("Onecall params: ", params);
    const { oneCallAPIForecast } = MockData;
    return res.status(200).json({ oneCallAPIForecast });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

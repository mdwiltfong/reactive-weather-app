const express = require("express");
const router = new express.Router();
const MockData = require("../mock_data/MockData");
router.get("/", async (req, res, next) => {
  try {
    const { params } = req;
    console.debug("Current Weather params: ", params);
    const {
      MockWeatherData: { mockOneCallAPIForecast },
    } = MockData;
    return res.status(200).json(mockOneCallAPIForecast);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

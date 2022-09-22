const express = require("express");
const router = new express.Router();
const OpenWeatherAPI = require("../helpers/OpenWeatherAPI");
router.get("/", async (req, res, next) => {
  const { q: city } = req.query;
  console.debug(city);
  try {
    const currentWeather = await OpenWeatherAPI.fetchCurrentWeather(city);
    return res.status(200).json({ data: currentWeather });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

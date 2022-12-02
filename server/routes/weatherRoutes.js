const express = require("express");
const router = new express.Router();
const OpenWeatherAPI = require("../helpers/OpenWeatherAPI");
router.get("/", async (req, res, next) => {
  const { q: city, lat, long } = req.query;
  console.debug(city);
  try {
    const currentWeather = await OpenWeatherAPI.fetchCurrentWeather(
      city,
      lat,
      long
    );
    return res.status(200).json(currentWeather);
  } catch (error) {
    return next(error);
  }
});

router.get("/dailyForecast", async (req, res, next) => {
  const { lat, lon } = req.query;
  console.debug(
    "Incoming Coordinates",
    "Latitude - " + lat,
    "Longitude -" + lon
  );
  try {
    const foreCast = await OpenWeatherAPI.fetchForecast(lat, lon);
    return res.status(200).json(foreCast);
  } catch (error) {
    return next(error);
  }
});
module.exports = router;

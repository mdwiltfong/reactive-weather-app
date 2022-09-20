const express = require("express");
const router = new express.Router();
import OpenWeatherAPI from "../helpers/OpenWeatherAPI";
router.get("/", async (req, res, next) => {
  const { lat, long } = req.body;
  try {
    const currentWeather = await OpenWeatherAPI.fetchCurrentWeather(lat, long);
    return res.status(200).json({ currentWeather });
  } catch (error) {
    return next(error);
  }
});

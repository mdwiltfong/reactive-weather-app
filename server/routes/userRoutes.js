const db = require("../../database/db");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const ExpressError = require("../ExpressError");
const { BCRYPT_WORK_FACTOR } = require("../../database/config");
const User = require("../../database/models/users");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const {
  ensureAdmin,
  authenticateJWT,
  ensureLoggedIn,
} = require("../middleware/auth");
const { createToken } = require("../helpers/token");
// Only Admins should be able to retrieve an entire list of users
router.get("/all", ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json({ users: users });
  } catch (error) {
    return next(error);
  }
});

/*
This route will create a saved weather instance for specific user.
It also ensures that a logged in user can only save instances to itself. 
*/
router.post(
  "/weather/:username",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const { username } = req.params;
      const { body: weatherData } = req;
      console.log("userRoutes weatherData:\n", weatherData);
      const weatherInstance = await User.saveWeather(username, weatherData);
      return res.status(201).json(weatherInstance);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
router.get("/:username", authenticateJWT, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.get(username);
    delete user.password;
    delete user.id;
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.delete(
  "/:username",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const { username } = req.params;
      const user = await User.remove(username);
      return res.status(202).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;

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

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, firstName, lastname, email } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    if (e.code === "23505") {
      return next(
        new ExpressError("Username taken. Please pick another!", 400)
      );
    }
    return next(e);
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
      const weatherInstance = await User.saveWeather(username, weatherData);
      return res.status(201).send({ data: weatherInstance });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;

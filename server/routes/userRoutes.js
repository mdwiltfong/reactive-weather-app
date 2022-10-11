const db = require("../../database/db");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const ExpressError = require("../ExpressError");
const { BCRYPT_WORK_FACTOR } = require("../../database/config");
const User = require("../../database/models/users");
const Weather = require("../../database/models/weathers");
const { ensureAdmin, authenticateJWT } = require("../middleware/auth");
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

router.post("/weather/:username", async (req, res, next) => {
  const { username } = req.params;
  const { weatherData } = req.body;
});

module.exports = router;

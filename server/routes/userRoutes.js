const db = require("../../database/db");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const ExpressError = require("../ExpressError");
const { BCRYPT_WORK_FACTOR } = require("../../database/config");
const User = require("../../database/models/users");
const { ensureAdmin } = require("../middleware/auth");
// Only Admins should be able to retrieve an entire list of users
router.get("/all", ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    return users.json(users.rows);
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
    return res.json(results.rows[0]);
  } catch (error) {
    if (e.code === "23505") {
      return next(
        new ExpressError("Username taken. Please pick another!", 400)
      );
    }
    return next(e);
  }
});

module.exports = router;

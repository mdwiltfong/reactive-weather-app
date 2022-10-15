const db = require("../../database/db");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const ExpressError = require("../ExpressError");
const { BCRYPT_WORK_FACTOR } = require("../../database/config");
const User = require("../../database/models/users");
const { route } = require("../app");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    const results = await User.get(username);
    const user = results.rows[0];
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return res.json({ data: user });
      }
    }
  } catch (error) {
    console.error("ERROR", error.message);
    return next(error);
  }
});

module.exports = router;

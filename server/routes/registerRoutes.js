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
router.post("/", async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === "23505") {
      return next(
        new ExpressError("Username taken. Please pick another!", 400)
      );
    }
    return next(error);
  }
});

module.exports = router;

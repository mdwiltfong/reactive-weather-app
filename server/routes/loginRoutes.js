const express = require("express");
const router = new express.Router();
const { ExpressError, NotFoundError } = require("../ExpressError");
const User = require("../../database/models/users");
const { createToken } = require("../helpers/token");

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    console.debug("USERNAME AND PASSWORD", username, password);
    const user = await User.authenticate(username, password);

    if (user != null) {
      const token = createToken(user);
      return res.json(token);
    } else {
      throw new NotFoundError("No user Found");
    }
    return res.json({ token });
  } catch (error) {
    console.error("ERROR", error.message);
    return next(error);
  }
});

module.exports = router;

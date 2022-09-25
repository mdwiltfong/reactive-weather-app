const db = require("../../database/db");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const ExpressError = require("../ExpressError");
const { BCRYPT_WORK_FACTOR } = require("../../database/config");
// Only Admins should be able to retrieve an entire list of users
router.get("/all", async (req, res, next) => {
  try {
    const users = await db.query(`SELECT * FROM users;`);
    return users.json(users.rows);
  } catch (error) {
    return next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const results = await db.query(
      `
    INSERT INTO users (username,password)
    VALUES ($1,$2)
    RETURNING username
    `,
      [username, password]
    );

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

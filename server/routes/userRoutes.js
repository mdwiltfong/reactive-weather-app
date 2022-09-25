const db = require("../../database/db");
const express = require("express");
const router = new express.Router();

router.get("/all", async (req, res, next) => {
  try {
    const users = await db.query(`SELECT * FROM users;`);
    return users.json(users.rows);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

"use strict";

const db = require("../../../database/db");
const User = require("../../../database/models/users");

const { createToken } = require("../../helpers/token");

async function commonBeforeAll() {
  const usersQuery = `ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
  await db.query(usersQuery);
  const weathersQuery = `ALTER SEQUENCE weathers_id_seq RESTART WITH 1;`;
  await db.query(weathersQuery);
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM weathers");
  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password",
    isAdmin: false,
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
};

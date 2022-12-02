"use strict";

/** Shared config for application; can be required many places. */

const dotenv = require("dotenv").config({ path: "../../.env" });
console.log(dotenv);
require("colors");
console.debug("DATA BASE CONFIG DOTENV \n", dotenv);
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
const BASE_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : "postgresql://mdwiltfong:5056@localhost:5432/";
console.log(BASE_URI);
// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? BASE_URI + "weatherapp_test"
    : BASE_URI + "weatherapp";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};

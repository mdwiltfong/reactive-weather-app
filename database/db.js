const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "test") {
  try {
    db = new Client({
      connectionString: getDatabaseUri(),
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } catch (e) {
    console.error(e.message);
  }
} else {
  db = new Client(process.env.DATABASE_URL);
}

db.connect();

module.exports = db;

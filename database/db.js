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
    console.debug("Database cursor", db);
  } catch (e) {
    console.error(e.message);
  }
} else {
  db = new Client({
    connectionString: getDatabaseUri(),
  });
}

db.connect();

module.exports = db;

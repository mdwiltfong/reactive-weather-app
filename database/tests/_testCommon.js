const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");
async function resetTableIds(tablename) {
  const query = `ALTER SEQUENCE ${tablename}_id_seq RESTART WITH 1;`;
  await db.query(query);
}
async function executeInsertQuery(tableName) {
  let insertQuery;
  if (this.tableName === "users") {
    insertQuery = `
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`;
    await resetTableIds("users");
    await db.query(insertQuery, [
      await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    ]);
  } else {
    insertQuery = `
    INSERT INTO weathers (user_id,city_name,utc_offset,latitude,longitude)
    VALUES 
    (1,'madrid',2,null,null),
    (2,'london',1,null,null),
    (2,'chicago',1,null,null),
    (1,'ottawa',-4,null,null),
    (1,null,-4,56,47)
    `;
    await resetTableIds("weathers");
    await db.query(insertQuery);
  }
}

async function commonBeforeAll(tableName) {
  // noinspection SqlWithoutWhere
  this.tableName = tableName.toLowerCase();
  await db.query(`DELETE FROM ${this.tableName}`);
  await executeInsertQuery(this.tableName);
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};

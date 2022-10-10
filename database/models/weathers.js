const db = require("../db");

const { BCRYPT_WORK_FACTOR } = require("../config");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../../server/ExpressError");
class Weather {
  /** Given a username, return data about all the saved weather instances of a user.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async getAll(username) {
    const result = await db.query(
      `SELECT city_name,
                  utc_offset AS "utcOffset",
                  city_name AS "cityName",
                  latitude,
                  longitude 
           FROM weathers
           where user_id=$1
           ORDER BY city_name`,
      [username]
    );

    const weather = result.rows;

    if (!weather)
      throw new NotFoundError(`No weather instance found for: ${username}`);

    /*    
 TODO: Replace this query for saved weather instances
 const userApplicationsRes = await db.query(
      `SELECT a.job_id
           FROM applications AS a
           WHERE a.username = $1`,
      [username]
    ); 

    user.applications = userApplicationsRes.rows.map((a) => a.job_id);
    */
    return weather;
  }
  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = Weather;

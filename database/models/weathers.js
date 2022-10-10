const db = require("../db");
const queries = require("./queries");
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
   * Returns { utc_offset,city_name,latitude,longitude }
   *
   * Throws NotFoundError if user not found.
   **/

  static async getAll(username) {
    const result = await db.query(queries.weatherQueries.getWeatherInstances, [
      username,
    ]);

    const weather = result.rows;

    if (!weather)
      throw new NotFoundError(`No weather instance found for: ${username}`);
    return weather;
  }

  static async save({ userId, cityName, utcOffset, latitude, longitude }) {}
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

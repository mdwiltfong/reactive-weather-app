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
  /** Given a usersID, return data about all the saved weather instances of a user.
   *
   * Returns { utc_offset,city_name,latitude,longitude }
   *
   * Throws NotFoundError if user not found.
   **/

  static async getAll(username) {
    const result = await db.query(
      queries.weatherQueries.getWeatherInstancesByUser,
      [username]
    );

    const weather = result.rows;

    if (!weather)
      throw new NotFoundError(`No weather instance found for: ${username}`);
    return weather;
  }

  static async save({ userId, cityName, utcOffset, latitude, longitude }) {
    const result = await db.query(queries.weatherQueries.insertWeather, [
      userId,
      cityName,
      utcOffset,
      latitude,
      longitude,
    ]);
    const weather = result.rows[0];
    return weather;
  }

  /*
Given a weatherInstances ID, the function will remove the instance from the DB. 
  */
  static async remove(weatherId) {
    let result = await db.query(queries.weatherQueries.removeWeather, [
      weatherId,
    ]);
    const weather = result.rows[0];

    if (!weather)
      throw new NotFoundError(`No weather instace with an id of ${weatherId}`);
  }
}

module.exports = Weather;
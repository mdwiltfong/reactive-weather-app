const db = require("../db");
const queries = require("./queries");
const { BCRYPT_WORK_FACTOR } = require("../config");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../../server/ExpressError");
const Weather = require("./weathers");
class User {
  static async getSavedWeather(userName) {
    try {
      const user = await User.get(userName);
      return await Weather.getAll(user.id);
    } catch (error) {
      console.error(error);
    }
  }

  static async saveWeather(username, weatherData) {
    try {
      const user = await this.get(username);
      weatherData.userId = user.id;
      console.debug("saveWeather: \n", weatherData);
      const newWeatherInstance = await Weather.save(weatherData);
      return newWeatherInstance;
    } catch (error) {
      console.error(error);
    }
  }

  static async authenticate(username, password) {
    try {
      // try to find the user first
      const user = await this.get(username);
      if (user) {
        // compare hashed password to a new hash from password
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid === true) {
          delete user.password;
          return user;
        }
      }
      throw new UnauthorizedError("Invalid username/password");
    } catch (error) {
      console.error("Authentication Error", error.message);
    }
  }

  static async register({
    username,
    password,
    firstName,
    lastName,
    email,
    isAdmin = false,
  }) {
    const duplicateCheck = await db.query(queries.userQueries.getUser, [
      username,
    ]);

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(queries.userQueries.insertUser, [
      username,
      hashedPassword,
      firstName,
      lastName,
      email,
      isAdmin,
    ]);

    const user = result.rows[0];

    return user;
  }
  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

  static async findAll() {
    const result = await db.query(queries.userQueries.findAllUsers);

    return result.rows;
  }
  /** Given a username, return data about user.
   *
   * Returns {id, username, firstName, lastName, isAdmin }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(queries.userQueries.getUser, [username]);

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const savedWeather = await Weather.getAll(user.id);
    user["savedWeather"] = savedWeather;
    return user;
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

module.exports = User;

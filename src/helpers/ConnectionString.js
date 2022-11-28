export class ConnectionString {
  static #baseURL = process.env.REACT_APP_EXPRESS_URL || "http://localhost:";

  static getExpressURL() {
    return this.getBaseURL() + process.env.REACT_APP_EXPRESS_PORT;
  }

  static getBaseURL() {
    return this.#baseURL;
  }
}

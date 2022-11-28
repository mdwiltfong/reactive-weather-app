class ConnectionString {
  static getOpeanWeatherAPIURL() {
    return process.env.OWAPI_BASE_URL || "http://localhost:8000";
  }
}

module.exports = ConnectionString;

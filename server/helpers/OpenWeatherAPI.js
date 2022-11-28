const axios = require("axios");
const dotenv = require("dotenv").config({ path: "../../../.env" });
console.debug("DOTENV FILE", dotenv);
const ConnectionString = require("./ConnectionString");
//const OWAPI_BASE_URL = process.env.REACT_APP_MOCK;
const OWAPI_BASE_URL = ConnectionString.getOpeanWeatherAPIURL();
console.debug("OWAPI BASE URL: \n", OWAPI_BASE_URL);
const api_key = process.env.OPENWEATHER_API_KEY;
class OpenWeatherAPI {
  static async request(endpoint, data = {}, method = "get") {
    data.appid = api_key;
    data.units = "metric";
    const url = `${OWAPI_BASE_URL}/data/${endpoint}`;
    console.debug("API Call:", url, endpoint, data, method);
    const params = method === "get" ? data : {};

    try {
      const weatherData = await axios({ url, method, data, params });
      return weatherData.data;
    } catch (err) {
      console.error("API Error:", err.response.data);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async fetchCurrentWeather(city = null, lat, lon) {
    let data;
    if (lat && lon) {
      data = {
        lat: lat,
        lon: lon,
      };
    } else {
      data = {
        q: city,
      };
    }
    try {
      const currentWeather = await this.request("2.5/weather", data);
      return currentWeather;
    } catch (error) {
      return undefined;
    }
  }

  static async fetchForecast(lat, long) {
    try {
      const oneApiCall = await this.request("3.0/onecall", {
        lat: lat,
        long: long,
      });
      return oneApiCall;
    } catch (error) {
      console.error("Fetch Forecast", error.message);
      return undefined;
    }
  }
}

module.exports = OpenWeatherAPI;

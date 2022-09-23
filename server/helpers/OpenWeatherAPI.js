const axios = require("axios");
const dotenv = require("dotenv").config({ path: "../../.env" });
console.debug("DOTENV FILE", dotenv);
const OWAPI_BASE_URL = process.env.OWAPI_MOCK_URL;

const api_key = process.env.OPENWEATHER_API_KEY;
class OpenWeatherAPI {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", OWAPI_BASE_URL, endpoint, data, method);
    data.appid = api_key;
    const url = `${OWAPI_BASE_URL}/${endpoint}`;
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

  static async fetchCurrentWeather(city) {
    try {
      const currentWeather = await this.request("/2.5/weather", {
        q: city,
      });
      console.log(currentWeather);
      return currentWeather;
    } catch (error) {
      return undefined;
    }
  }

  static async fetchForecast(lat, long) {
    try {
      const oneApiCall = await this.request("/3.0/onecall", {
        lat: lat,
        long: long,
      });
      return oneApiCall;
    } catch (error) {
      return undefined;
    }
  }
}

module.exports = OpenWeatherAPI;

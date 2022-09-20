import axios from "axios";
const BASE_URL = process.env.OWAPI_CURRENTWEATHER;
const api_key = process.env.OPENWEATHER_API_KEY;
export class OpenWeatherAPI {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", BASE_URL, endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
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

  static async fetchCurrentWeather(lat, long) {
    try {
      const currentWeather = await this.request("/weather", {
        lat: lat,
        long: long,
      });
      return currentWeather;
    } catch (error) {
      return undefined;
    }
  }
}

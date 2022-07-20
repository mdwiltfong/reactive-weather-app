import axios from "axios";

const BASE_URL = process.env.REACT_APP_MOCK || "http://localhost:3001";
const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;

/* This class will handle all the api calls to the server */
class OpenWeatherAPI {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${OpenWeatherAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /* No authentication is needed to get the weather of a city */
  static async currentWeather(city) {
    const data = {
      q: city,
      appid: api_key,
    };
    const currentWeather = await this.request("weather", data);
    return currentWeather;
  }
}

OpenWeatherAPI.token = "test";

export default OpenWeatherAPI;

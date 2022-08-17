import axios from "axios";

const BASE_URL = process.env.REACT_APP_MOCK || "http://localhost:3001";
const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;
console.debug("BASE_URL", BASE_URL);
/* This class will handle all the api calls to the server */
export default class OpenWeatherAPI {
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

export class DateFormatter {
  epochTime;
  now;
  days;
  constructor(epochTime) {
    this.epochTime = epochTime;
    this.now = new Date(epochTime);
    this.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  }

  getDay = () => {
    const day = this.days[this.now.getDay()];
    return day;
  };
  getTime = () => {
    let hours = this.now.getHours();
    let timeOfDay = "a.m.";
    const minutes = this.now.getMinutes();
    if (hours > 12) {
      hours -= 12;
      timeOfDay = "p.m.";
    }
    return `${hours}:${minutes} ${timeOfDay}`;
  };
}
OpenWeatherAPI.token = "test";

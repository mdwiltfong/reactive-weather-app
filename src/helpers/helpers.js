import axios from "axios";

const BASE_URL = process.env.REACT_APP_MOCK || "http://localhost:3001";
const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;
console.debug("BASE_URL", BASE_URL);
/* This class will handle all the api calls to the server and NOT the actual OpenWeather API. */
export default class OpenWeatherAPI {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", BASE_URL, endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${OpenWeatherAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      const weatherData = await axios({ url, method, data, params, headers });
      return weatherData.data;
    } catch (err) {
      console.error("API Error:", err.response.data);
      let message = err.response.data.error.message;

      throw Array.isArray(message) ? message : [message];
    }
  }

  /* No authentication is needed to get the weather of a city */
  static async currentWeather(city = null, lat, long) {
    let data;
    if (city) {
      data = {
        q: city,
        appid: api_key,
      };
    } else {
      data = {
        lat: lat,
        long: long,
      };
    }

    try {
      const currentWeather = await this.request("weather", data);
      console.debug("API Call for current weather", currentWeather);
      return currentWeather;
    } catch (error) {
      return undefined;
    }
  }
  static async currentWeatherForecast(lat, lon) {
    const data = {
      lat: lat,
      lon: lon,
      exclude: "hourly,minutely",
      appid: api_key,
    };
    try {
      const { data: foreCast } = await this.request(
        "weather/dailyForecast",
        data
      );
      return foreCast;
    } catch (error) {
      return undefined;
    }
  }
  static async loginUser({ userName, password }) {
    try {
      const token = await this.request("login", { userName, password }, "post");
      console.debug("TOKEN loginUser\n", token);
      if (token) {
        this.token = token;
        return token;
      } else {
        throw new Error("There was an issue logging in");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  static async getUser(userName) {
    try {
      const user = await this.request(`users/${userName}`);
      return user;
    } catch (error) {
      console.error(error.message);
    }
  }
}

/* 
DateFormatter will do the following: 

It will show the client's time, day of the week, and time. 
It will also show the searched city's time, day of the week and time.
*/
export class DateFormatter {
  static _days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  constructor(epochTime = Date.now()) {
    this.now = epochTime;
    this._Date = new Date(this.now);
    this.days = this.constructor._days;
  }
  static _getDay = (epochTime) => {
    const day = new Date(epochTime).getDay();
    return DateFormatter._days[day];
  };
  GetDay = () => {
    const dateInstance = this._Date;
    const number = dateInstance.getDay();
    return this.days[number];
  };
  GetTime = () => {
    const dateInstance = this._Date;
    let hours = dateInstance.getHours();
    let timeOfDay = "a.m.";
    const minutes = dateInstance.getMinutes();
    if (hours > 12) {
      hours -= 12;
      timeOfDay = "p.m.";
    }
    return `${hours}:${minutes} ${timeOfDay}`;
  };
}

OpenWeatherAPI.token = "test";

import axios from "axios";

const BASE_URL = process.env.REACT_APP_MOCK || "http://localhost:3001";
const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;
console.debug("BASE_URL", BASE_URL);
/* This class will handle all the api calls to the server */
export default class OpenWeatherAPI {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", BASE_URL, endpoint, data, method);

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
    console.log(currentWeather);
    return currentWeather;
  }
  static async currentWeatherForecast(city, lat, lon) {
    //TODO: We will have to use a different route for this. As a result we will have tochanget he mock.
    const data = {
      lat: lat,
      lon: lon,
      exclude: "hourly,minutely",
      appid: api_key,
    };
    const forecast = await this.request("dailyForecast", data);
    console.log(forecast);
    return forecast;
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
    console.log(this);
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

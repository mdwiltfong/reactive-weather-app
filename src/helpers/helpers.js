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

/* 
DateFormatter will do the following: 

It will show the client's time, day of the week, and time. 
It will also show the searched city's time, day of the week and time.
*/
export class DateFormatter {
  constructor(epochTime = Date.now(), timeZoneOffSet = null) {
    this.now = epochTime;
    this._Date = new Date(this.now);
    this.offSet = timeZoneOffSet;
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
  #timeZoneOffSet = () => {
    this.now += this.offSet;
  };
  GetDay = () => {
    const dateInstance = this._Date;
    if (this.offSet) {
      this.#timeZoneOffSet();
      return this.days[dateInstance.getDay()];
    }
    const number = dateInstance.getDay();
    return this.days[number];
  };
  GetTime = () => {
    if (this.offSet) {
      this.#timeZoneOffSet();
    }
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

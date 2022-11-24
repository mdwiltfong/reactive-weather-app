import axios from "axios";

const BASE_URL = process.env.REACT_APP_EXPRESS_URL || "http://localhost:3001";
console.log("ENVIORNMENT VARIABLES helpers.js", process.env);

const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;
console.debug("BASE_URL", BASE_URL);
/* This class will handle all the api calls to the server and NOT the actual OpenWeather API. */
export default class OpenWeatherAPI {
  static token;
  static setToken(token) {
    this.token = token;
  }
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    console.debug("API Call:", url, endpoint, data, method);
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

  /* No authentication is needed to get the weather of a city.
  This function will return the current weather of a city of specific location in the following format:
{
    "coord": {
        "lon": -75.6981,
        "lat": 45.4112
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 275.99,
        "feels_like": 270.26,
        "temp_min": 274.68,
        "temp_max": 276.97,
        "pressure": 1015,
        "humidity": 57
    },
    "visibility": 10000,
    "wind": {
        "speed": 8.75,
        "deg": 220,
        "gust": 11.83
    },
    "clouds": {
        "all": 75
    },
    "dt": 1669066158,
    "sys": {
        "type": 2,
        "id": 2005537,
        "country": "CA",
        "sunrise": 1669032592,
        "sunset": 1669066070
    },
    "timezone": -18000,
    "id": 6094817,
    "name": "Ottawa",
    "cod": 200
}

  
  
  */

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
    console.debug("Current Weather Forecast Data: \n", data);
    try {
      const response = await this.request("weather/dailyForecast", data);
      return response;
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
  /*
Function returns an object representing the logged in user. Returns an object of this form:
data:{user:{
    "username": "m.mcfly",
    "firstName": "Marty",
    "lastName": "McFly",
    "email": "hello.mcfly@okta.com",
    "isAdmin": false,
    "savedWeather": [
        {
            "userId": 1,
            "cityName": "madrid",
            "utcOffset": 2,
            "latitude": null,
            "longitude": null
        }
    ]
}}
*/
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
    let minutes = dateInstance.getMinutes();
    if (hours > 12) {
      hours -= 12;
      timeOfDay = "p.m.";
    }
    minutes = minutes > 10 ? minutes : "0" + minutes;
    return `${hours}:${minutes} ${timeOfDay}`;
  };
}

OpenWeatherAPI.token = "test";

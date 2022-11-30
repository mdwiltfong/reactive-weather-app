import axios from "axios";
import { ConnectionString } from "./ConnectionString";

//const BASE_URL = process.env.REACT_APP_EXPRESS_URL || "http://localhost:3001";

//const BASE_URL = ConnectionString.getExpressURL();

const BASE_URL = process.env.REACT_APP_PUBLIC_URL || "http://localhost:5001";

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
      console.error("API Error:", err);
      return err.response.data;
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
      console.error(error);
    }
  }
  /*
  Returns the forecast of a city or a location with the following return:
  {
    "lat": 45.3214,
    "lon": -75.8907,
    "timezone": "America/Nipigon",
    "timezone_offset": -18000,
    "current": {
        "dt": 1669216410,
        "sunrise": 1669205579,
        "sunset": 1669238841,
        "temp": 273.76,
        "feels_like": 273.76,
        "pressure": 1022,
        "humidity": 84,
        "dew_point": 271.58,
        "uvi": 0.67,
        "clouds": 92,
        "visibility": 10000,
        "wind_speed": 0.45,
        "wind_deg": 229,
        "wind_gust": 1.34,
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ]
    },
    "daily": [
        {
            "dt": 1669219200,
            "sunrise": 1669205579,
            "sunset": 1669238841,
            "moonrise": 1669204200,
            "moonset": 1669237680,
            "moon_phase": 0,
            "temp": {
                "day": 273.83,
                "min": 269.13,
                "max": 274.84,
                "night": 270.58,
                "eve": 272.41,
                "morn": 270.02
            },
            "feels_like": {
                "day": 271.38,
                "night": 268.66,
                "eve": 272.41,
                "morn": 266.89
            },
            "pressure": 1022,
            "humidity": 83,
            "dew_point": 271.5,
            "wind_speed": 2.26,
            "wind_deg": 298,
            "wind_gust": 5.61,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 92,
            "pop": 0.01,
            "uvi": 1.13
        },
        {
            "dt": 1669305600,
            "sunrise": 1669292057,
            "sunset": 1669325198,
            "moonrise": 1669295520,
            "moonset": 1669326480,
            "moon_phase": 0.03,
            "temp": {
                "day": 273.68,
                "min": 270.83,
                "max": 276.74,
                "night": 273.02,
                "eve": 274.25,
                "morn": 272.33
            },
            "feels_like": {
                "day": 271.11,
                "night": 270.28,
                "eve": 271.59,
                "morn": 269.43
            },
            "pressure": 1026,
            "humidity": 96,
            "dew_point": 272.91,
            "wind_speed": 2.53,
            "wind_deg": 173,
            "wind_gust": 5.44,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 99,
            "pop": 0,
            "uvi": 0.63
        },
        {
            "dt": 1669392000,
            "sunrise": 1669378533,
            "sunset": 1669411558,
            "moonrise": 1669386720,
            "moonset": 1669416060,
            "moon_phase": 0.07,
            "temp": {
                "day": 276.02,
                "min": 272.67,
                "max": 277.07,
                "night": 273.33,
                "eve": 274.96,
                "morn": 273.82
            },
            "feels_like": {
                "day": 273.53,
                "night": 267.44,
                "eve": 269.06,
                "morn": 270.86
            },
            "pressure": 1003,
            "humidity": 99,
            "dew_point": 275.75,
            "wind_speed": 8.62,
            "wind_deg": 302,
            "wind_gust": 15.95,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 1,
            "rain": 10.56,
            "uvi": 0.28
        },
        {
            "dt": 1669478400,
            "sunrise": 1669465009,
            "sunset": 1669497920,
            "moonrise": 1669477200,
            "moonset": 1669506480,
            "moon_phase": 0.1,
            "temp": {
                "day": 273.8,
                "min": 270.25,
                "max": 277.92,
                "night": 274.23,
                "eve": 277.05,
                "morn": 270.58
            },
            "feels_like": {
                "day": 270.33,
                "night": 270.33,
                "eve": 273.18,
                "morn": 265.98
            },
            "pressure": 1016,
            "humidity": 77,
            "dew_point": 270.13,
            "wind_speed": 6.28,
            "wind_deg": 309,
            "wind_gust": 12.85,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 55,
            "pop": 0,
            "uvi": 1.37
        },
        {
            "dt": 1669564800,
            "sunrise": 1669551484,
            "sunset": 1669584285,
            "moonrise": 1669566840,
            "moonset": 1669597500,
            "moon_phase": 0.14,
            "temp": {
                "day": 276.96,
                "min": 273.07,
                "max": 278.3,
                "night": 275.83,
                "eve": 276.33,
                "morn": 273.37
            },
            "feels_like": {
                "day": 276.96,
                "night": 273.62,
                "eve": 273.51,
                "morn": 269.69
            },
            "pressure": 1007,
            "humidity": 86,
            "dew_point": 274.63,
            "wind_speed": 4.1,
            "wind_deg": 208,
            "wind_gust": 9.46,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 1,
            "rain": 11.26,
            "uvi": 2
        },
        {
            "dt": 1669651200,
            "sunrise": 1669637957,
            "sunset": 1669670652,
            "moonrise": 1669655700,
            "moonset": 1669688760,
            "moon_phase": 0.18,
            "temp": {
                "day": 276.25,
                "min": 272.87,
                "max": 276.47,
                "night": 272.87,
                "eve": 275.46,
                "morn": 275.47
            },
            "feels_like": {
                "day": 272.14,
                "night": 267.48,
                "eve": 269.72,
                "morn": 272.08
            },
            "pressure": 999,
            "humidity": 97,
            "dew_point": 275.68,
            "wind_speed": 8.29,
            "wind_deg": 299,
            "wind_gust": 14.16,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 1,
            "rain": 1.52,
            "uvi": 2
        },
        {
            "dt": 1669737600,
            "sunrise": 1669724429,
            "sunset": 1669757021,
            "moonrise": 1669743960,
            "moonset": 1669779960,
            "moon_phase": 0.22,
            "temp": {
                "day": 272.66,
                "min": 270.57,
                "max": 274.81,
                "night": 272.63,
                "eve": 273.74,
                "morn": 271.11
            },
            "feels_like": {
                "day": 268.51,
                "night": 269.8,
                "eve": 273.74,
                "morn": 265.89
            },
            "pressure": 1022,
            "humidity": 66,
            "dew_point": 266.94,
            "wind_speed": 5.27,
            "wind_deg": 287,
            "wind_gust": 11.37,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": 23,
            "pop": 0,
            "uvi": 2
        },
        {
            "dt": 1669824000,
            "sunrise": 1669810901,
            "sunset": 1669843393,
            "moonrise": 1669831860,
            "moonset": 0,
            "moon_phase": 0.25,
            "temp": {
                "day": 274.19,
                "min": 272.3,
                "max": 280.5,
                "night": 280.5,
                "eve": 277.2,
                "morn": 272.53
            },
            "feels_like": {
                "day": 269.01,
                "night": 276.72,
                "eve": 273.88,
                "morn": 267.62
            },
            "pressure": 1009,
            "humidity": 75,
            "dew_point": 270.07,
            "wind_speed": 6.89,
            "wind_deg": 144,
            "wind_gust": 16.66,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 0.98,
            "rain": 2.46,
            "uvi": 2
        }
    ]
}
  */
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
  static async loginUser({ username, password }) {
    try {
      const response = await this.request(
        "login",
        { username, password },
        "post"
      );
      console.debug("TOKEN loginUser\n", response);
      if (!response.error) {
        this.setToken(response);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteUser(username) {
    try {
      const user = await this.request(`users/${username}`, {}, "delete");
      return user;
    } catch (error) {
      console.error(error);
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
  static async saveWeather(weatherInstance, username) {
    try {
      const savedWeather = await this.request(
        `users/weather/${username}`,
        weatherInstance,
        "POST"
      );
      return savedWeather;
    } catch (error) {
      console.error(error);
    }
  }
  /*
  Function takes in a user object with the following form: 
  {
    username:string,
    password:string,
    firstName:string,
    lastName:string,
    email:string,
    isAdmin:boolean
  }
  */
  static async registerUser(userObj) {
    try {
      const response = await this.request("register", userObj, "POST");
      if (!response.error) {
        this.setToken(response);
      }
      return response;
    } catch (error) {
      console.error("Register User: " + error);
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

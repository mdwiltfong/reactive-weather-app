import OpenWeatherAPI, { DateFormatter } from "../helpers/helpers";

class Weather {
  constructor({ currentWeather, foreCast }) {
    this.description = currentWeather.weather[0].description;
    this.icon = currentWeather.weather[0].icon;
    this.utc_offset = currentWeather.timezone;
    this.lat = currentWeather.lat;
    this.long = currentWeather.long;
    if ("main" in currentWeather) {
      this.temp = currentWeather.main.temp;
    } else {
      this.temp = currentWeather.temp;
    }
    this.name = currentWeather.name;
    this.Date = new DateFormatter(currentWeather.dt);
    if ("daily" in foreCast) {
      this.forecast = foreCast.daily.slice(0, 5);
    } else {
      this.forecast = foreCast.slice(0, 5);
    }
  }
  get getDay() {
    return this.Date.GetDay();
  }
  get getTime() {
    return this.Date.GetTime();
  }
  getTempFahrenheit() {
    return (this.temp * 9) / 5 + 32;
  }
  getForeCast() {
    return this.forecast.map((forecast) => {
      return {
        day: DateFormatter._getDay(forecast.dt).slice(0, 3),
        icon: forecast.weather[0].icon,
        maxTemp: forecast.temp.max,
        minTemp: forecast.temp.min,
      };
    });
  }
}

export default Weather;

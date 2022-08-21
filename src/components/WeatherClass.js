import OpenWeatherAPI, { DateFormatter } from "../helpers/helpers";

class Weather {
  constructor({ currentWeather, foreCast }) {
    this.description = currentWeather.weather[0].description;
    this.icon = currentWeather.weather[0].icon;
    this.temp = currentWeather.main.temp;
    this.name = currentWeather.name;
    this.Date = new DateFormatter(currentWeather.dt);
    this.forecast = foreCast.list;
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
}

export default Weather;

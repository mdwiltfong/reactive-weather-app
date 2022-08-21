import OpenWeatherAPI, { DateFormatter } from "../helpers/helpers";

class Weather {
  constructor({ weather, main: { temp }, name, dt }) {
    this.description = weather[0].description;
    this.icon = weather[0].icon;
    this.temp = temp;
    this.name = name;
    this.Date = new DateFormatter(dt);
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
  async getForecast() {
    const forecasts = await OpenWeatherAPI.currentWeatherForecast(this.name);
    return forecasts.list.map((forecast) => {
      return forecast.weather[0];
    });
  }
}

export default Weather;

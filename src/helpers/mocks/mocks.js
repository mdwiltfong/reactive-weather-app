const mockCurrentWeatherData = {
  coord: {
    lon: -75.6981,
    lat: 45.4112,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 292.14,
    feels_like: 291.56,
    temp_min: 291.35,
    temp_max: 293.7,
    pressure: 1020,
    humidity: 56,
  },
  visibility: 10000,
  wind: {
    speed: 3.09,
    deg: 110,
  },
  clouds: {
    all: 100,
  },
  dt: 1663446475,
  sys: {
    type: 2,
    id: 2005537,
    country: "CA",
    sunrise: 1663411423,
    sunset: 1663456262,
  },
  timezone: -14400,
  id: 6094817,
  name: "Ottawa",
  cod: 200,
};

export default mockCurrentWeatherData;

import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import OpenWeatherAPI from "../helpers/helpers";
import WeatherIcon from "./WeatherIcon";

export default function SavedWeatherInstance({ savedWeatherInstance }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchWeather(savedWeatherInstance) {
    try {
      const weatherData = await OpenWeatherAPI.currentWeather(
        savedWeatherInstance.cityName
      );
      const { data } = weatherData;
      setWeatherData(data);
      setIsLoading(false);
      return weatherData;
    } catch (error) {
      console.error("Fetching weather data instance: ", error.message);
    }
  }
  useEffect(() => {
    fetchWeather(savedWeatherInstance);
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ListGroupItem className="d-flex justify-content-between">
          {weatherData.name}
          <WeatherIcon icon={weatherData.weather[0].icon} />
          {weatherData.weather[0].description}
          {weatherData.main.temp}
        </ListGroupItem>
      )}
    </>
  );
}

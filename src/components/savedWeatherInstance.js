import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import OpenWeatherAPI from "../helpers/helpers";
export default function savedWeatherInstance({ savedWeatherInstances }) {
  const [savedWeatherInstances, setWeatherInstances] = useState(
    savedWeatherInstances
  );
  async function fetchWeather(savedWeatherInstance) {
    try {
      const weatherData = await OpenWeatherAPI.currentWeather(
        savedWeatherInstance.cityName
      );
      return weatherData;
    } catch (error) {
      console.error("Fetching weather data instance: ", error.message);
    }
  }

  return (
    <>
      <ListGroup>
        {savedWeatherInstances.map((weatherInstance) => {
          return <ListGroupItem>{weatherInstance.cityName}</ListGroupItem>;
        })}
      </ListGroup>
    </>
  );
}

import React from "react";
import { Button } from "reactstrap";
import OpenWeatherAPI from "../helpers/helpers";

export default function SavedWeatherBtn({ currentWeather }) {
  async function handleOnClick(e) {
    e.preventDefault();

    const savedWeather = await OpenWeatherAPI.saveWeather();
  }
  return (
    <Button onClick={handleOnClick} color="primary">
      {" "}
      +{" "}
    </Button>
  );
}

import React, { useContext } from "react";
import { Button } from "reactstrap";
import UserContext from "../context/UserContext";
import OpenWeatherAPI from "../helpers/helpers";

export default function SavedWeatherBtn({ currentWeather }) {
  const { currentUser } = useContext(UserContext);
  async function handleOnClick(e) {
    try {
      e.preventDefault();
      const savedWeather = await OpenWeatherAPI.saveWeather(
        currentWeather,
        currentUser.username
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button onClick={handleOnClick} color="primary">
      {" "}
      +{" "}
    </Button>
  );
}

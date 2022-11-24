import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import UserContext from "../context/UserContext";
import OpenWeatherAPI from "../helpers/helpers";

export default function SavedWeatherBtn({ currentWeather }) {
  const { currentUser } = useContext(UserContext);
  const [btnColor, setBtnColor] = useState("primary");
  async function handleOnClick(e) {
    try {
      e.preventDefault();
      const savedWeather = await OpenWeatherAPI.saveWeather(
        currentWeather,
        currentUser.username
      );
      savedWeather ? setBtnColor("success") : setBtnColor("danger");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button onClick={handleOnClick} color={btnColor}>
      {" "}
      +{" "}
    </Button>
  );
}

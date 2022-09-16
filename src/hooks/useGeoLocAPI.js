import React, { useEffect, useState } from "react";
import OpenWeatherAPI from "../helpers/helpers";
import WeatherClass from "../components/WeatherClass";

const useGeoLocAPI = () => {
  const [coords, setCoords] = useState(null);
  console.debug("Test");
  function success(position) {
    console.debug(
      "Browser Postion",
      position.coords.latitude,
      position.coords.longitude
    );
    setCoords({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    console.debug("Coords in success function", coords);
  }
  function error(error) {
    console.error(error.message);
  }
  useEffect(() => {
    console.log(navigator);
    if ("geolocation" in navigator) {
      console.log("Geolocation is in navigator");
      navigator.geolocation.getCurrentPosition(success, error);
    }
    console.log("UseEffect");
  }, []);

  return [coords, setCoords];
};

export default useGeoLocAPI;

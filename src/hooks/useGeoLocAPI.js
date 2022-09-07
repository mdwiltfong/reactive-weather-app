import React, { useState } from "react";
import useLocalStoragestate from "./useLocalStorageState";
function GetCoords() {
  const [coords, setCoords] = useLocalStoragestate("coords", undefined);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  return {
    latitud: lat,
    longitude: long,
  };
}

function success(postion) {
  lat = postion.coords.latitude;
  long = postion.coords.longitude;
}
function error(err) {
  console.error("Unable to obtain coordinates", err.message);
}
const useGeoLocAPI = () => {
  const [coords, setCoords] = useState(GetCoords);
  return [coords, setCoords];
};

export default useGeoLocAPI;

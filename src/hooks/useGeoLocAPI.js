import React, { useState } from "react";

const useGeoLocAPI = () => {
  const [coords, setCoords] = useState(null);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error.message);
      }
    );
  }
  return [coords, setCoords];
};

export default useGeoLocAPI;

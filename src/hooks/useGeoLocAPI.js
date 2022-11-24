import React, { useEffect, useState } from "react";

function useGeoLocAPI() {
  const [coords, setCoords] = useState(null);
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
  }
  function error(error) {
    console.error(error.message);
    setCoords({
      lat: 55,
      long: -75,
    });
  }
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return [coords, setCoords];
}

export default useGeoLocAPI;

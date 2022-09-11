import React, { useEffect, useState } from "react";
//TODO: You will have to implement the useEffect hook here within the custom hook.
const useGeoLocAPI = () => {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
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
  }, []);

  return [coords, setCoords];
};

export default useGeoLocAPI;

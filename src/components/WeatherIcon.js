import React from "react";

export default function WeatherIcon({ icon }) {
  return (
    <>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
    </>
  );
}

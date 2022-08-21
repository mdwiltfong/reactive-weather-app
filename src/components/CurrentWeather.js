import { useState } from "react";
import { Container } from "reactstrap";
import { DateFormatter } from "../helpers/helpers";
import { Forecast } from "./Forecast";

export function CurrentWeather({ weatherData }) {
  const [isCelsius, setIsCelsius] = useState(true);
  function handleClick() {
    setIsCelsius((state) => !state);
  }
  let units;

  if (isCelsius) {
    units = (
      <>
        <div id="C"> &#176;C</div>
        <a href="#" onClick={handleClick} id="F">
          &#176;F
        </a>
      </>
    );
  } else {
    units = (
      <>
        <a href="#" onClick={handleClick} id="C">
          {" "}
          &#176;C
        </a>
        <div id="F">&#176;F</div>
      </>
    );
  }
  return (
    <>
      <Container className="d-flex">
        <div className="col d-flex" data-testid="current-weather">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          ></img>
          <div
            className="col-sm d-flex"
            style={{ lineHeight: "60px", fontSize: "48px", fontWeight: "400" }}
            data-testid="current-tempearture"
          >
            {weatherData.temp}
            <div
              className="col d-flex"
              style={{
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              {units}
            </div>
          </div>
          <div className="col" id="units"></div>
        </div>
        <span className="d-flex flex-column">
          <div className="col my-auto text-end" data-testid="current-date">
            <p className="my-0" style={{ fontSize: "2em" }}>
              {weatherData.name}
            </p>
            <p>
              {weatherData.getDay} {weatherData.getTime}
            </p>
          </div>
          <div id="date-time" style={{ fontSize: "1em" }}></div>
        </span>
        <Forecast data={weatherData.forecast} />
      </Container>
    </>
  );
}

import { Container } from "reactstrap";

export function CurrentWeather({ weatherData }) {
  return (
    <>
      <Container className="d-flex">
        <div className="col d-flex" data-testid="current-weather">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          ></img>
          <div className="col" data-testid="current-tempearture">
            {weatherData.main.temp}
          </div>
          <div className="col" id="units">
            <div id="C">{"\\uU+00B0"} C</div>
            <div id="F"></div>
          </div>
        </div>
        <div className="col my-auto" data-testid="city">
          {weatherData.name}
        </div>

        <div className="col my-auto" data-testid="current-date">
          {weatherData.name}
        </div>
      </Container>
    </>
  );
}

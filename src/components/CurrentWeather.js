import { Container } from "reactstrap";

export function CurrentWeather({ weatherData }) {
  return (
    <>
      <Container>
        <div data-testid="city">{weatherData.name}</div>
      </Container>
    </>
  );
}

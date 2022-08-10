import { Container } from "reactstrap";
// TODO: Handle the data from OPI so that it renders a container with a data-id of 'city'
export function CurrentWeather({ weatherData }) {
  return (
    <>
      <Container>
        <div data-testid="city">{weatherData.name}</div>
      </Container>
    </>
  );
}

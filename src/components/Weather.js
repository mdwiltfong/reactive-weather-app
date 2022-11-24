import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import { useFormik } from "formik";
import OpenWeatherAPI from "../helpers/helpers";
import { useContext, useEffect, useState } from "react";
import { CurrentWeather } from "./CurrentWeather";
import WeatherClass from "./WeatherClass";
import UserContext from "../context/UserContext";
import SavedWeatherBtn from "./SavedWeatherBtn";
export function Weather({ localStorage, setLocalStorage, coordinates }) {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    if (coordinates) {
      async function fetchWeather({ lat, long }) {
        //TODO: In the event the API call returns and error, the front needs to handle it smoothly.
        const { current: currentWeather, daily: foreCast } =
          await OpenWeatherAPI.currentWeatherForecast(lat, long);
        const { name, coord, timezone } = await OpenWeatherAPI.currentWeather(
          null,
          lat,
          long
        );
        currentWeather.name = name;
        currentWeather.coord = coord;
        currentWeather.timezone = timezone;
        setWeatherData(
          new WeatherClass({
            currentWeather: {
              ...currentWeather,
            },
            foreCast,
          })
        );
      }
      localStorage.weatherapp.coords = coordinates;
      fetchWeather(coordinates).then(() => {
        setLoading(false);
      });
    }
  }, [coordinates]);
  useEffect(() => {
    if (loading == false) {
      localStorage.weatherapp.coords = coordinates;
      setLocalStorage((prevState) => {
        prevState.weatherapp.coords = coordinates;
        return prevState;
      });
    }
  }, [loading]);
  const formik = useFormik({
    initialValues: {
      city: "",
    },
    onSubmit: async (values) => {
      const { city } = values;
      const currentWeather = await OpenWeatherAPI.currentWeather(city);
      const foreCast = await OpenWeatherAPI.currentWeatherForecast(
        currentWeather.coord.lat,
        currentWeather.coord.lon
      );

      setWeatherData(new WeatherClass({ currentWeather, foreCast }));
    },
  });
  return (
    <>
      <Container className="w-25">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <FormGroup>
            <Label for="city">City Name</Label>
            <Input
              id="city"
              name="city"
              placeholder="Search for a city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.q}
              className="w-75 mx-auto"
            />
          </FormGroup>
        </Form>
        <Container className="d-flex flex-row">
          {loading ? (
            <p>Loading...</p>
          ) : weatherData ? (
            <CurrentWeather weatherData={weatherData} />
          ) : null}
          {currentUser ? (
            <SavedWeatherBtn currentWeather={weatherData} />
          ) : null}
        </Container>
      </Container>
    </>
  );
}

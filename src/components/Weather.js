import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import { Formik, useFormik } from "formik";
import OpenWeatherAPI from "../helpers/helpers";
import { useEffect, useState } from "react";
import { CurrentWeather } from "./CurrentWeather";
import WeatherClass from "./WeatherClass";
import useGeoLocAPI from "../hooks/useGeoLocAPI";
export function Weather({ localStorage, setLocalStorage, coordinates }) {
  const [loading, setLoading] = useState(true);

  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    if (coordinates) {
      async function fetchWeather({ lat, long }) {
        //TODO: In the event the API call returns and error, the front needs to handle it smoothly.
        const { current: currentWeather, daily: foreCast } =
          await OpenWeatherAPI.currentWeatherForecast(lat, long);
        const { name } = await OpenWeatherAPI.currentWeather(null, lat, long);
        setWeatherData(
          new WeatherClass({
            currentWeather: {
              ...currentWeather,
              name: name,
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
      setLocalStorage(localStorage);
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
        {loading ? (
          <p>Loading...</p>
        ) : weatherData ? (
          <CurrentWeather weatherData={weatherData} />
        ) : null}
        {}
      </Container>
    </>
  );
}

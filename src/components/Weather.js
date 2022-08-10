import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import { Formik, useFormik } from "formik";
import OpenWeatherAPI from "../helpers/helpers";
import { useState } from "react";
import { CurrentWeather } from "./CurrentWeather";
export function Weather(params) {
  const [weatherData, setWeatherData] = useState();
  const formik = useFormik({
    initialValues: {
      city: "",
    },
    onSubmit: async (values) => {
      const { city } = values;
      const currentWeather = await OpenWeatherAPI.currentWeather(city);
      console.debug("Weather Data OnSubmit", currentWeather);
      setWeatherData(currentWeather);
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
            />
          </FormGroup>
        </Form>
        {weatherData ? <CurrentWeather weatherData={weatherData} /> : null}
      </Container>
    </>
  );
}

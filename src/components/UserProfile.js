import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Label, Form, Input, FormGroup, Button, ListGroup } from "reactstrap";
import UserContext from "../context/UserContext";
import OpenWeatherAPI, { WeatherInstance } from "../helpers/helpers";
import SavedWeatherInstance from "./SavedWeatherInstance";
export default function UserProfile({ localStorage }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      if (localStorage.weatherapp.token) {
        const {
          weatherapp: { token },
        } = localStorage;
        OpenWeatherAPI.setToken(token);
        const { username } = jwt_decode(token);
        const user = await OpenWeatherAPI.getUser(username);
        setCurrentUser(user);
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);
  let savedWeatherContent = null;
  if (!isLoading && currentUser.savedWeather.length > 0) {
    savedWeatherContent = (
      <ListGroup className="container">
        {currentUser.savedWeather.map((savedWeather) => {
          return <SavedWeatherInstance savedWeatherInstance={savedWeather} />;
        })}
      </ListGroup>
    );
  }
  return (
    <>
      {!isLoading ? (
        <h1 data-testid="user_title">{currentUser.username}</h1>
      ) : (
        <p>Loading....</p>
      )}
      {savedWeatherContent}
    </>
  );
}

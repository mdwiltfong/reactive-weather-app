import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Label, Form, Input, FormGroup, Button } from "reactstrap";
import UserContext from "../context/UserContext";
import OpenWeatherAPI from "../helpers/helpers";
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
        const {
          data: { user },
        } = await OpenWeatherAPI.getUser(username);
        setCurrentUser(user);
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);
  return (
    <>{isLoading ? <p>Loading...</p> : <h1>Hey {currentUser.username}</h1>}</>
  );
}

import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Weather } from "./components/Weather";
import { Login } from "./components/Login";
import NavBar from "./components/NavBar";
import OpenWeatherAPI from "./helpers/helpers";
import { useEffect, useState } from "react";
import useLocalStoragestate from "./hooks/useLocalStorageState";
import jwt_decode from "jwt-decode";
import useGeoLocAPI from "./hooks/useGeoLocAPI";

const USER_INITIAL_STATE = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: false,
  applications: [],
};

function App() {
  const [localStorage, setLocalStorage] = useLocalStoragestate("weatherapp");
  const [coords, setCoords] = useGeoLocAPI();
  const {
    weatherapp: { token },
  } = localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          OpenWeatherAPI.token = token;
          const user = await OpenWeatherAPI.getUser(username);
          setCurrentUser(user);
          setInfoLoaded(true);
        } catch (error) {
          console.error(error.message);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    fetchUser();
  }, [token]);
  async function logIn(loginCredentials = { userName: null, password: null }) {
    try {
      let token = await OpenWeatherAPI.loginUser(loginCredentials);
      setLocalStorage((prevState) => {
        prevState.weatherapp.token = token;
        return prevState;
      });
      console.debug("Logged in User", currentUser);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Weather
              localStorage={localStorage}
              setLocalStorage={setLocalStorage}
              coordinates={coords}
            />
          }
        />
        <Route path="/login" element={<Login logIn={logIn} />} />
      </Routes>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Weather } from "./components/Weather";
import { Login } from "./components/Login";
import UserProfile from "./components/UserProfile";
import NavBar from "./components/NavBar";
import OpenWeatherAPI from "./helpers/helpers";
import { useEffect, useState } from "react";
import useLocalStoragestate from "./hooks/useLocalStorageState";
import jwt_decode from "jwt-decode";
import useGeoLocAPI from "./hooks/useGeoLocAPI";
import UserContext from "./context/UserContext";

const USER_INITIAL_STATE = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: false,
  applications: [],
};
function App() {
  const [coords, setCoords] = useGeoLocAPI();
  const [localStorage, setLocalStorage] = useLocalStoragestate(
    "weatherapp",
    coords
  );
  const {
    weatherapp: { token },
  } = localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const navigate = useNavigate();
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
  }, [localStorage]);
  async function logIn(loginCredentials = { userName: null, password: null }) {
    try {
      let { token } = await OpenWeatherAPI.loginUser(loginCredentials);
      console.debug("TOKEN\n", token);
      setLocalStorage((prevState) => {
        prevState.weatherapp.token = token;
        return prevState;
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, setLocalStorage }}
      >
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
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

import { useContext } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import OpenWeatherAPI from "../helpers/helpers";
import jwt_decode from "jwt-decode";

export default function PrivateRoute({ path, element, token }) {
  const { currentUser } = useContext(UserContext);
  if (currentUser == null && token == null) {
    return <Navigate to={path} />;
  } else if (token != null) {
    return element;
  }
  return element;
}

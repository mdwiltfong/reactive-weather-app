import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Label, Form, Input, FormGroup, Button } from "reactstrap";
import UserContext from "../context/UserContext";
export default function UserProfile(params) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const INITIAL_FORM_STATE = {
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  };
  console.log(currentUser);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const formik = useFormik({
    initialValues: {},
  });
  return <h1>{currentUser}</h1>;
}

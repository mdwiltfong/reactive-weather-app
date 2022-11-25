import React from "react";
import { useFormik } from "formik";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
export function SignUp() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  return (
    <>
      <h1>Register!</h1>
      <Form
        className="container w-25 my-5"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            data-testid="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            type="text"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            data-testid="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            type="text"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            data-testid="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="text"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            data-testid="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Password"
            data-testid="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
          />
        </FormGroup>{" "}
        <Button data-testid="submit">Submit</Button>
      </Form>
    </>
  );
}

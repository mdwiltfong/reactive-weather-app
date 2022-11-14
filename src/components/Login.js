import { Formik, useFormik } from "formik";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import OpenWeatherAPI from "../helpers/helpers";
// TODO: It's probably best to put the state in App.js
// https://github.com/mdwiltfong/react-jobly/blob/c2063debb57c2d6e97c76b7f0d507629ceac0e30/src/App.js
export function Login({ logIn }) {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => logIn(values),
  });

  return (
    <Form
      className="container w-25 my-5"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <FormGroup>
        <Label for="exampleEmail" hidden>
          Username
        </Label>
        <Input
          id="userName"
          name="userName"
          placeholder="Username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
      </FormGroup>{" "}
      <FormGroup>
        <Label for="password" hidden>
          Password
        </Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
        />
      </FormGroup>{" "}
      <Button>Submit</Button>
    </Form>
  );
}

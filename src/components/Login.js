import { Formik, useFormik } from "formik";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import OpenWeatherAPI from "../helpers/helpers";
// TODO: It's probably best to put the state in App.js
// https://github.com/mdwiltfong/react-jobly/blob/c2063debb57c2d6e97c76b7f0d507629ceac0e30/src/App.js
export function Login({ login }) {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const token = await OpenWeatherAPI.loginUser(values);
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  return (
    <Form className="container w-25 my-5">
      <FormGroup>
        <Label for="exampleEmail" hidden>
          Email
        </Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Email"
          type="email"
        />
      </FormGroup>{" "}
      <FormGroup>
        <Label for="examplePassword" hidden>
          Password
        </Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Password"
          type="password"
        />
      </FormGroup>{" "}
      <Button>Submit</Button>
    </Form>
  );
}

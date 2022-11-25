import { Formik, useFormik } from "formik";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
export function Login({ logIn }) {
  const formik = useFormik({
    initialValues: {
      username: "",
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
        <Label for="password" hidden>
          Password
        </Label>
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
  );
}

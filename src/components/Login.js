import { Formik, useFormik } from "formik";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
export function Login(params) {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { userName, password } = values;
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

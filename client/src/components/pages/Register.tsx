import React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";

import useRequest from "../../hooks/use-request";
import { FormWrapper } from "../layouts/FormWrapper";
import { Title } from "../layouts/Title";
import { Input } from "../layouts/Input";
import "./register.scss";

const validationSchema = yup.object({
  firstName: yup.string().min(2).max(30).required(),
  lastName: yup.string().min(2).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(256).required(),
  passwordConfirmed: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});
export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { doRequest, requestErrors } = useRequest();
  return (
    <div className="register-page-container">
      <Title title="REGISTER" />
      <FormWrapper>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmed: "",
          }}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            // async call
            await doRequest({
              body: data,
              url: "users/register",
              method: "post",
              onSuccess: (data: Response) => history.push("/login"),
            });

            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className="input-wrapper">
                <Input type="text" name="firstName" label="First Name" />
              </div>
              <div className="input-wrapper">
                <Input type="text" name="lastName" label="Last Name" />
              </div>
              <div className="input-wrapper">
                <Input type="email" name="email" label="Email" />
              </div>
              <div className="input-wrapper">
                <Input type="password" name="password" label="password" />
              </div>
              <div className="input-wrapper">
                <Input
                  type="password"
                  name="passwordConfirmed"
                  label="Password Confirmed"
                />
              </div>
              <div className="input-wrapper">
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        {requestErrors}
      </FormWrapper>
    </div>
  );
};

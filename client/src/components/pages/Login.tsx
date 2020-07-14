import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";

import { FormWrapper } from "../layouts/FormWrapper";
import { Title } from "../layouts/Title";
import { Input } from "../layouts/Input";
import useRequest from "../../hooks/use-request";
import "./login.scss";
import { UserContext } from "../../user-context";
import { User } from "../../types";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(256),
});
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { currentUser } = useContext(UserContext);
  const { doRequest, requestErrors } = useRequest();
  return (
    <div className="login-page-container">
      <Title title="LOGIN" />
      {!currentUser ? (
        <FormWrapper>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              // async call

              await doRequest({
                body: data,
                url: "/users/login",
                method: "post",
                onSuccess: (user: User) => history.push("/", { user }),
              });
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <div className="login-input-wrapper">
                  <Input type="email" name="email" label="email" />
                </div>
                <div className="login-input-wrapper">
                  <Input type="password" name="password" label="password" />
                </div>
                <div className="login-input-wrapper">
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {requestErrors}
        </FormWrapper>
      ) : (
        <div>
          <h4>You Allready LoggedIn</h4>
        </div>
      )}
    </div>
  );
};

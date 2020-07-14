import React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";

import useRequest from "../../hooks/use-request";
import { FormWrapper } from "../layouts/FormWrapper";
import { Input } from "../layouts/Input";
import "./register.scss";

const validationSchema = yup.object({
  userName: yup.string().min(2).max(30).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(6).max(15).required(),
});

interface Props extends RouteComponentProps {}
export const CreateTask: React.FC<Props> = (props) => {
  const { history, location } = props;
  // @ts-ignore
  const task = location?.state?.task;
  const { doRequest, requestErrors } = useRequest();
  return (
    <div className="register-page-container">
      <FormWrapper>
        <div className="register-form-title">
          <h4>Create New Task</h4>
        </div>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            userName: task?.userName ? task.userName : "",
            email: task?.email ? task.email : "",
            phone: task?.phone ? task.phone : "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            if (task) {
              doRequest({
                body: data,
                url: `/tasks/${task.id}`,
                method: "put",
                onSuccess: (data: Response) => history.push("/tasks"),
              });
            } else {
              doRequest({
                body: data,
                url: "/tasks",
                method: "post",
                onSuccess: (data: Response) => history.push("/tasks"),
              });
            }
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className="input-wrapper">
                <Input type="text" name="userName" label="User Name" />
              </div>
              <div className="input-wrapper">
                <Input type="email" name="email" label="Email" />
              </div>
              <div className="input-wrapper">
                <Input type="text" name="phone" label="Phone" />
              </div>

              <div className="input-wrapper">
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  submit
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

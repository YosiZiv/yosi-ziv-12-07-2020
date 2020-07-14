import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useField, FieldAttributes } from "formik";
const useStyles = makeStyles({
  root: {
    margin: "10px 0",
  },
});
type InputProps = { label: string; type?: string } & FieldAttributes<{}>;

export const Input: React.FC<InputProps> = ({ label, type, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      className={classes.root}
      {...field}
      error={!!errorText}
      helperText={errorText}
      type={type}
      label={label}
      id="outlined-basic"
      variant="outlined"
    />
  );
};

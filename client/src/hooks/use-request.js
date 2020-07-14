import React, { useState } from "react";
import { axios } from "../api";
export default () => {
  const [requestErrors, setRequestErrors] = useState(null);
  const doRequest = async ({ url, method, body = null, onSuccess }) => {
    try {
      setRequestErrors(null);
      const response = await axios()[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setRequestErrors(
        <div>
          <h4>Ooops....</h4>
          <ul style={{ color: "red" }}>
            {err.response?.data?.errors?.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, requestErrors };
};

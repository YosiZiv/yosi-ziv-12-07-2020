import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import useRequest from "../../hooks/use-request";
import { User } from "../../types";
export const Logout: React.FC<RouteComponentProps> = ({ history }) => {
  const { doRequest } = useRequest();
  useEffect(() => {
    const logout = async () => {
      await doRequest({
        url: "/users/logout",
        method: "get",
        onSuccess: () => history.push("/", { user: null }),
      });
    };
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="App">Logging you out</div>;
};

import React, { useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import useRequest from "../../hooks/use-request";
import { Context } from "../../user-context";

export const Logout: React.FC<RouteComponentProps> = ({ history }) => {
  const { doRequest } = useRequest();
  const { setUser } = useContext(Context);
  useEffect(() => {
    const logout = async () => {
      await doRequest({
        url: "/users/logout",
        method: "get",
        onSuccess: () => {
          setUser({ currentUser: null });
          history.push("/");
        },
      });
    };
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="App">Logging you out</div>;
};

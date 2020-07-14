import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import "./App.css";
import { User } from "./types";
import { UserContext } from "./user-context";
import { Home } from "./components/pages/Home";
import { Navigation } from "./components/layouts/Navigation";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Tasks } from "./components/pages/Tasks";
import { CreateTask } from "./components/pages/CreateTask";
import { Logout } from "./components/pages/Logout";
import useRequest from "./hooks/use-request";
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/create-task" component={CreateTask} />
    <Route path="/tasks" component={Tasks} />
    <Route path="/logout" component={Logout} />
  </Switch>
);

const App: React.FC<RouteComponentProps> = (props) => {
  const { location } = props;
  const [user, setUser] = useState<
    { currentUser: null } | { currentUser: User }
  >({ currentUser: null });
  const { doRequest } = useRequest();
  // @ts-ignore
  const isLoggedIn = location?.state?.user;
  useEffect(() => {
    const isAuth = async () => {
      await doRequest({
        url: "/users/currentuser",
        method: "get",
        onSuccess: (data: { currentUser: User }) => setUser(data),
      });
    };
    isAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Navigation />
        <header className="App-header">{routes}</header>
      </UserContext.Provider>
    </div>
  );
};

export default withRouter(App);

import React, { useEffect, useState, useContext } from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import "./App.css";
import { User } from "./types";
import { Home } from "./components/pages/Home";
import { Navigation } from "./components/layouts/Navigation";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Tasks } from "./components/pages/Tasks";
import { CreateTask } from "./components/pages/CreateTask";
import { Logout } from "./components/pages/Logout";
import useRequest from "./hooks/use-request";
import { Context } from "./user-context";
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
  const { currentUser } = useContext(Context);
  const [user, setUser] = useState<{ currentUser: null | User }>({
    currentUser: null,
  });
  const value = { currentUser: user.currentUser, setUser };
  const { doRequest } = useRequest();
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
  }, [currentUser]);
  return (
    <div className="App">
      <Context.Provider value={value}>
        <Navigation />
        <header className="App-header">{routes}</header>
      </Context.Provider>
    </div>
  );
};

export default withRouter(App);

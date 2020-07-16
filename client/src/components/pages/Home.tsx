import React, { useContext } from "react";
import "./home.scss";
import { NavLink } from "react-router-dom";

import { Button } from "@material-ui/core";

import { Context } from "../../user-context";
export const Home = () => {
  const { currentUser } = useContext(Context);
  return (
    <div className="home-page-container">
      <h2>Welcome To Tasks Application</h2>
      {currentUser ? (
        <NavLink to="/create-task">
          <Button variant="outlined" color="primary">
            Create Task
          </Button>
        </NavLink>
      ) : (
        <NavLink to="/register">
          <Button variant="outlined" color="primary">
            Create New User
          </Button>
        </NavLink>
      )}
    </div>
  );
};

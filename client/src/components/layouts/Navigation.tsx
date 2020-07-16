import React, { useContext } from "react";
import "./navigation.scss";
import { NavLink } from "react-router-dom";
import logo from "../../logo.png";
import { Context } from "../../user-context";
export const Navigation: React.FC = () => {
  const { currentUser } = useContext(Context);
  return (
    <div className="navigation-container">
      <div className="nav-logo-container">
        <img alt="logo" className="logo" src={logo} />
      </div>
      <div className="nav-main">
        <NavLink
          activeClassName="navLinkActive"
          className="nav-link"
          exact
          to="/"
        >
          HOME
        </NavLink>
        {currentUser && (
          <NavLink
            activeClassName="navLinkActive"
            className="nav-link"
            exact
            to="/tasks"
          >
            TASKS
          </NavLink>
        )}
      </div>
      {!currentUser ? (
        <div className="navAuth">
          <NavLink
            activeClassName="nav-link-active"
            className="nav-link"
            exact
            to="/login"
          >
            LOGIN
          </NavLink>
          <NavLink
            activeClassName="nav-link-active"
            className="nav-link"
            exact
            to="/register"
          >
            REGISTER
          </NavLink>
        </div>
      ) : (
        <NavLink
          activeClassName="nav-link-active"
          className="nav-link"
          exact
          to="/logout"
        >
          LOGOUT
        </NavLink>
      )}
    </div>
  );
};

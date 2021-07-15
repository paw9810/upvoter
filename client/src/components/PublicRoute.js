import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import { useContext } from "react";

const PublicRoute = ({ children, restricted, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated && restricted ? <Redirect to="/" /> : children;
      }}
    />
  );
};

export default PublicRoute;

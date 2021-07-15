import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import { useContext } from "react";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;

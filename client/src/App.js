import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PostView from "./views/PostView";
import MainView from "./views/MainView";
import ProfileView from "./views/ProfileView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AddPostView from "./views/AddPostView";
import axios from "axios";
import { API } from "./config";
import { useState, useEffect } from "react";
import AuthContext from "./contexts/authContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

axios.defaults.baseURL = API;

const App = () => {
  const [user, setUser] = useState("guest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = { user, setUser, isAuthenticated, setIsAuthenticated };

  useEffect(() => {
    setUser(localStorage.getItem("user") || "guest");
    setIsAuthenticated(
      localStorage.getItem("isAuthenticated") === "true" || false
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("user", user);
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [user, isAuthenticated]);
  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Switch>
          <PublicRoute restricted={false} exact path="/">
            <Redirect to="/p/1" />
          </PublicRoute>
          <PublicRoute restricted={false} path="/p/:defaultPage">
            <MainView />
          </PublicRoute>
          <PublicRoute restricted={false} exact path="/user/:profileName">
            <ProfileView />
          </PublicRoute>
          <PublicRoute restricted={false} path="/post/:postImage">
            <PostView />
          </PublicRoute>
          <PublicRoute restricted={true} exact path="/signin">
            <LoginView />
          </PublicRoute>
          <PublicRoute restricted={true} exact path="/signup">
            <RegisterView />
          </PublicRoute>
          <PrivateRoute exact path="/logout">
            <Redirect to="/p/1" />
          </PrivateRoute>
          <PrivateRoute exact path="/addPost">
            <AddPostView />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

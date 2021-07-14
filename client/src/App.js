import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PostView from "./views/PostView";
import MainView from "./views/MainView";
import ProfileView from "./views/ProfileView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import axios from "axios";
import { API } from "./config";
import { useState } from "react";
import AuthContext from "./contexts/authContext";

axios.defaults.baseURL = API;

const App = () => {
  const [user, setUser] = useState("guest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = { user, setUser, isAuthenticated, setIsAuthenticated };
  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/p/1" />
          </Route>
          <Route path="/p/:defaultPage">
            <MainView />
          </Route>
          <Route exact path="/user/:profileName">
            <ProfileView />
          </Route>
          <Route exact path="/post">
            <PostView />
          </Route>
          <Route exact path="/signin">
            {isAuthenticated && <Redirect to="/p/1" />}
            <LoginView />
          </Route>
          <Route exact path="/signup">
            <RegisterView />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

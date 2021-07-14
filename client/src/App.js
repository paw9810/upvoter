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

axios.defaults.baseURL = API;

const App = () => {
  return (
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
          <LoginView />
        </Route>
        <Route exact path="/signup">
          <RegisterView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

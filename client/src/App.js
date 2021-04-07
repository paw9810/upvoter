import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostView from "./views/PostView";
import MainView from "./views/MainView";
import ProfileView from "./views/ProfileView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainView />
        </Route>
        <Route exact path="/profile">
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

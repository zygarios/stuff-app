import React from "react";
import "./Sass/App.scss";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginPanel from "./Components/LoginPanel";
import HomePanel from "./Components/HomePanel";

function App() {
  return (
    <div className="stuff-app">
      <Switch>
        <Route path="/login" exact component={LoginPanel} />
        <Route path="/" component={HomePanel} />
      </Switch>
    </div>
  );
}

export default App;

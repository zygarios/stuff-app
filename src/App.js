import React, { useState, useEffect } from "react";
import "./Sass/App.scss";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginPanel from "./Components/LoginPanel";
import RegisterPanel from "./Components/RegisterPanel";
import HomePanel from "./Components/HomePanel";

function App() {
  return (
    <div className="stuff-app">
      <Switch>
        <Route path="/login" exact component={LoginPanel} />
        <Route path="/home" exact component={HomePanel} />
        {/* <Route path="/register" component={RegisterPanel} /> */}
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;

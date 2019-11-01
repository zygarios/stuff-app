import React, { useState } from "react";
import "./Sass/App.scss";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginPanel from "./Components/LoginPanel";
import HomePanel from "./Components/HomePanel";

function App() {
  const [isLoggedIn, setLoginStatus] = useState(true);
  return (
    <div className="stuff-app">
      {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/" />}
      <Switch>
        <Route path="/" exact component={LoginPanel} />
        <Route path="/home" component={HomePanel} />
      </Switch>
    </div>
  );
}

export default App;

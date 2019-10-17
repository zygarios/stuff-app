import React, { useState } from "react";
import "./Sass/App.scss";

import LoginPanel from "./Components/LoginPanel";
import HomePanel from "./Components/HomePanel";

function App() {
  const [isLoggedIn, setLoginStatus] = useState(true);
  return (
    <div className="stuff-app">
      {isLoggedIn ? <HomePanel /> : <LoginPanel />}
    </div>
  );
}

export default App;

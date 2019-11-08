import React, { useState } from "react";
import "../Sass/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

function HomePanel() {
  const [isLogged, setIsLogged] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    return <Redirect to="/login" />;
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <FontAwesomeIcon icon={faBars} className="navbar__hamburger-btn" />
        <FontAwesomeIcon
          icon={faPowerOff}
          className="navbar__logout-btn"
          onClick={() => setIsLogged(false)}
        />
        {!isLogged && handleLogout()}
        {/* <div className="navbar__search" />
        <div className="navbar__settings" /> */}
      </div>
    </nav>
  );
}

export default HomePanel;

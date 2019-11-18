import React, { useState } from "react";
import "../Sass/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPowerOff,
  faUserTag,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";
import axios from "axios";
const serverLogoutURL = "http://jimmyspage.pl/api/logout";

function Navbar() {
  const [isLogged, setIsLogged] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    return <Redirect to="/login" />;
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__title-logo">
          Zakładka
          <FontAwesomeIcon className="navbar__title-icon" icon={faBookmark} />
        </h1>
        <div className="navbar__menu">
          {isMenuOpen && (
            <>
              <span
                className="navbar__user-settings-btn"
                onClick={() => setIsUserSettingsOpen(state => !state)}>
                <FontAwesomeIcon icon={faUserTag} />
              </span>
              <span className="navbar__logout-btn">
                <FontAwesomeIcon
                  icon={faPowerOff}
                  onClick={() => setIsLogged(false)}
                />
              </span>
            </>
          )}
          <span
            className={`navbar__hamburger-btn ${isMenuOpen && "active-select"}`}
            onClick={() => setIsMenuOpen(state => !state)}>
            <FontAwesomeIcon icon={faBars} />
          </span>
        </div>
        {!isLogged && handleLogout()}
      </div>
    </nav>
  );
}

export default Navbar;

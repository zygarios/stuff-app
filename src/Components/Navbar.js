import React from "react";
import "../Sass/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function HomePanel() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <FontAwesomeIcon icon={faBars} className="navbar__hamburger" />
        <div className="navbar__search" />
        <div className="navbar__settings" />
      </div>
    </nav>
  );
}

export default HomePanel;

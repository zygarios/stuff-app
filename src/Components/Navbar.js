import React from "react";
import "../Sass/Navbar.scss";

function HomePanel() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__search" />
        <div className="navbar__settings" />
      </div>
    </nav>
  );
}

export default HomePanel;

import React, { useState } from "react";
import "../Sass/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import axios from "axios";

function HomePanel() {
  const [isLogged, setIsLogged] = useState(true);

  const history = useHistory();

  const handleLogout = () => {
    const token = localStorage.getItem("access_token");
    axios({
      method: "post",
      url: "https://jimmyspage.pl/api/logout",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        localStorage.removeItem("access_token");
      })
      .catch(error => console.log(error));
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__title-logo" onClick={() => history.push("/")}>
          Zakładka
          <FontAwesomeIcon className="navbar__title-icon" icon={faBookmark} />
        </h1>
        <span className="navbar__logout-btn">
          <FontAwesomeIcon
            icon={faPowerOff}
            onClick={() => setIsLogged(false)}
          />
        </span>
        {!isLogged && handleLogout()}
      </div>
    </nav>
  );
}

export default HomePanel;

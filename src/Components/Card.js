import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faUserCog } from "@fortawesome/free-solid-svg-icons";
import "../Sass/Card.scss";
import UserSettingsPanel from "./UserSettingsPanel";

const useResetSettingsActive = () => {
  useEffect(() => {
    document
      .querySelectorAll(".card")
      .forEach(item => item.classList.remove("active-settings"));
  });
};

function Card() {
  const [settingsActive, setSettingsActive] = useState(false);
  useResetSettingsActive();
  const handleSettingsClick = () => {
    // useResetSettingsActive();
    setSettingsActive(state => !state);
  };

  return (
    <li className={`card ${settingsActive && "active-settings"}`}>
      <div className="card__card-container">
        <div className="card__card-settings">
          <FontAwesomeIcon
            icon={faUserCog}
            className="settings-icon-watermark"
            style={settingsActive ? { opacity: ".5" } : { opacity: "0" }}
          />
          <span
            className="card__settings-icon-click"
            onClick={handleSettingsClick}
          >
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          {settingsActive && <UserSettingsPanel />}
        </div>
      </div>
    </li>
  );
}

export default Card;

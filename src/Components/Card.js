import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faUserCog } from "@fortawesome/free-solid-svg-icons";
import "../Sass/Card.scss";
import UserSettingsPanel from "./UserSettingsPanel";

function Card({ id, statusChanger, activeSettings }) {
  return (
    <li className={`card ${activeSettings && "active-settings"}`}>
      <div className="card__card-container">
        <div className="card__card-settings">
          <FontAwesomeIcon
            icon={faUserCog}
            className="settings-icon-watermark"
            style={activeSettings ? { opacity: ".5" } : { opacity: "0" }}
          />
          <span
            className="card__settings-icon-click"
            onClick={() => {
              statusChanger(id);
            }}
          >
            <FontAwesomeIcon icon={faSlidersH} />
          </span>
          {activeSettings && <UserSettingsPanel />}
        </div>
      </div>
    </li>
  );
}

export default Card;

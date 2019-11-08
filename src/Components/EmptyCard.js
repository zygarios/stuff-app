import React from "react";
import "../Sass/EmptyCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import SettingsPanel from "./SettingsPanel";

function EmptyCard({ statusChanger, activeStatus }) {
  let activeSettings = false;
  if (activeStatus !== undefined) {
    activeSettings = activeStatus.activeSettings;
  }
  return (
    <li className={`card card__empty ${activeSettings && "active-settings"}`}>
      <div
        style={activeSettings ? { display: "none" } : { display: "flex" }}
        onClick={() => statusChanger(activeStatus.activeId, "settings")}
        className="card__empty card__empty-icon"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div
        onClick={() => statusChanger(activeStatus.activeId, "home")}
        className="card__home-icon-click"
        style={activeSettings === false ? { display: "none" } : null}
      >
        <FontAwesomeIcon icon={faShare} />
      </div>

      {activeSettings && <SettingsPanel />}
    </li>
  );
}

export default EmptyCard;
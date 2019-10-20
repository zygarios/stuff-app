import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faBookmark,
  faAngleDoubleUp,
  faGenderless
} from "@fortawesome/free-solid-svg-icons";
import "../Sass/Card.scss";
import SettingsPanel from "./SettingsPanel";
import BookmarkPanel from "./BookmarkPanel";

function Card({ id, statusChanger, activeSettings, activeBookmark }) {
  return (
    <li
      className={`card ${activeSettings &&
        "active-settings"} ${activeBookmark && "active-bookmark"}`}>
      <div className="card__card-container">
        <FontAwesomeIcon
          className="card__bookmark-icon-click"
          style={
            activeSettings !== false || activeBookmark !== false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(id, "bookmark");
          }}
          icon={faGenderless}
        />
        <FontAwesomeIcon
          className="card__settings-icon-click"
          style={
            activeSettings !== false || activeBookmark !== false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(id, "settings");
          }}
          icon={faEllipsisV}
        />
        <span
          className="card__home-icon-click"
          style={
            activeSettings === false && activeBookmark === false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(id, "home");
          }}>
          <FontAwesomeIcon icon={faAngleDoubleUp} />
        </span>
        {activeSettings && <SettingsPanel />}
        {activeBookmark && <BookmarkPanel />}
      </div>
    </li>
  );
}

export default Card;

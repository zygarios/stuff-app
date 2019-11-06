import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faShare,
  faGenderless
} from "@fortawesome/free-solid-svg-icons";
import "../Sass/CardItem.scss";
import SettingsPanel from "./SettingsPanel";
import BookmarkPanel from "./BookmarkPanel";

function Card({ id: category_id, name, image, statusChanger, activeStatus }) {
  let activeBookmark = false;
  let activeSettings = false;
  if (activeStatus !== undefined) {
    activeBookmark = activeStatus.activeBookmark;
    activeSettings = activeStatus.activeSettings;
  }

  return (
    <li
      className={`card ${activeSettings &&
        "active-settings"} ${activeBookmark && "active-bookmark"}`}
    >
      <div className="card__card-container">
        <h2
          style={
            activeBookmark || activeSettings ? { opacity: 0 } : { opacity: 1 }
          }
          className="card__category-title"
        >
          {name}
        </h2>
        <div
          className="card__bookmark-icon-click"
          style={
            activeSettings !== false || activeBookmark !== false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(category_id, "bookmark");
          }}
        >
          <FontAwesomeIcon icon={faGenderless} />
        </div>
        <div
          className="card__settings-icon-click"
          style={
            activeSettings !== false || activeBookmark !== false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(category_id, "settings");
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div
          className="card__home-icon-click"
          style={
            activeSettings === false && activeBookmark === false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(category_id, "home");
          }}
        >
          <FontAwesomeIcon icon={faShare} />
        </div>
        {activeBookmark && <BookmarkPanel category_id={category_id} />}
        {activeSettings && <SettingsPanel />}
      </div>
    </li>
  );
}

export default Card;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faShare } from "@fortawesome/free-solid-svg-icons";
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
      style={{ backgroundImage: image }}>
      <div className="card__card-container" />
      <h2
        style={
          activeBookmark || activeSettings ? { opacity: 0 } : { opacity: 1 }
        }
        className="card__category-title">
        {name}
      </h2>
      <div
        className="bookmark-icon-click"
        style={
          activeSettings !== false || activeBookmark !== false
            ? { display: "none" }
            : null
        }
        onClick={() => {
          statusChanger(category_id, "bookmark");
        }}
      />
      <div
        className="settings-icon-click"
        style={
          activeSettings !== false || activeBookmark !== false
            ? { display: "none" }
            : null
        }
        onClick={() => {
          statusChanger(category_id, "settings");
        }}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
      <div
        className="home-icon-click"
        style={activeSettings === false ? { display: "none" } : null}
        onClick={() => {
          statusChanger(category_id, "home");
        }}>
        <FontAwesomeIcon icon={faShare} />
      </div>
      {activeBookmark && (
        <BookmarkPanel
          category_id={category_id}
          activeBookmark={activeBookmark}
          statusChanger={statusChanger}
          name={name}
        />
      )}
      {activeSettings && <SettingsPanel />}
    </li>
  );
}

export default Card;

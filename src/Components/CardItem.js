import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faShare } from "@fortawesome/free-solid-svg-icons";
import "../Sass/CardItem.scss";
import SettingsPanel from "./SettingsPanel";
import BookmarkPanel from "./BookmarkPanel";

function Card({
  id: category_id,
  name,
  image,
  statusChanger,
  activeStatus,
  getCardsData
}) {
  let activeBookmark = false;
  let activeSettings = false;
  if (activeStatus !== undefined) {
    activeBookmark = activeStatus.activeBookmark;
    activeSettings = activeStatus.activeSettings;
  }

  const serverURL = "https://jimmyspage.pl";
  return (
    <li
      className={`card ${activeSettings &&
        "active-settings"} ${activeBookmark && "active-bookmark"}`}
      style={{ backgroundImage: image && `url(${serverURL + image})` }}
    >
      <div className="card__card-container" />
      <h2
        style={{
          opacity: activeBookmark || activeSettings ? 0 : 1,
          background:
            !image &&
            "linear-gradient(90deg, transparent, rgba(0,0,0,.3) 15%, rgba(0,0,0,.3) 85%, transparent)"
        }}
        className="card__category-title"
      >
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
        }}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
      <div
        className="home-icon-click"
        style={activeSettings === false ? { display: "none" } : null}
        onClick={() => {
          statusChanger(category_id, "home");
        }}
      >
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
      {activeSettings && (
        <SettingsPanel
          category_id={category_id}
          name={name}
          statusChanger={statusChanger}
          getCardsData={getCardsData}
          image={image}
        />
      )}
    </li>
  );
}

export default Card;

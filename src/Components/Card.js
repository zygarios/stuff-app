import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faShare,
  faGenderless
} from "@fortawesome/free-solid-svg-icons";
import "../Sass/Card.scss";
import SettingsPanel from "./SettingsPanel";
import BookmarkPanel from "./BookmarkPanel";
import { Redirect, Route, Switch } from "react-router";

function Card({ id, statusChanger, activeSettings, activeBookmark }) {
  return (
    <li
      onClick={e => {
        if (e.target.parentNode.nodeName === "LI") {
          statusChanger(id, "bookmark");
        }
      }}
      className={`card ${activeSettings &&
        "active-settings"} ${activeBookmark && "active-bookmark"}`}>
      <div className="card__card-container">
        <span
          className="card__bookmark-icon-click"
          style={
            activeSettings !== false || activeBookmark !== false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(id, "bookmark");
          }}>
          <FontAwesomeIcon icon={faGenderless} />
        </span>
        <span
          className="card__settings-icon-click"
          style={
            activeSettings !== false || activeBookmark !== false
              ? { display: "none" }
              : null
          }
          onClick={() => {
            statusChanger(id, "settings");
          }}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </span>
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
          <FontAwesomeIcon icon={faShare} />
        </span>
        {activeSettings && <Redirect to={`/home/settings-${id}`} />}
        {activeBookmark && <Redirect to={`/home/bookmark-${id}`} />}
        <Switch>
          <Route path={`/home/settings-${id}`} component={SettingsPanel} />
          <Route path={`/home/bookmark-${id}`} component={BookmarkPanel} />
        </Switch>
      </div>
    </li>
  );
}

export default Card;

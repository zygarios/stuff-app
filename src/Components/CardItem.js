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
import axios from "axios";

const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

function Card({ id: category_id, name, image, statusChanger, activeStatus }) {
  let activeBookmark = false;
  let activeSettings = false;
  if (activeStatus !== undefined) {
    activeBookmark = activeStatus.activeBookmark;
    activeSettings = activeStatus.activeSettings;
  }
  const [groupsData, setGroupsData] = useState([]);
  const [sitesData, setSitesData] = useState([]);
  const [allSitesData, setAllSitesData] = useState([]);

  const getGroupsData = () => {
    const token = localStorage.getItem("access_token");
    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups`;
    axios
      .get(serverGroupsURL, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        const groups = res.data;
        const groupsList = groups.map(
          ({ id, name, created_at, updated_at }) => ({
            id,
            name,
            created_at,
            updated_at,
            active: false
          })
        );
        setGroupsData(groupsList);
      })
      .catch(err => console.log(err));
  };

  // const getSitesData = group_id => {
  //   const token = localStorage.getItem("access_token");
  //   const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups/${group_id}/sites`;
  //   axios
  //     .get(serverGroupsURL, {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: "Bearer " + token
  //       }
  //     })
  //     .then(res => {
  //       const sites = res.data;
  //       const sitesList = sites.map(({ id, name, created_at, updated_at }) => ({
  //         id,
  //         name,
  //         created_at,
  //         updated_at,
  //         active: false
  //       }));
  //       setSitesData(sitesList);
  //     })
  //     .catch(err => console.log(err));
  // };
  const getAllSitesData = category_id => {
    const token = localStorage.getItem("access_token");
    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/sites`;
    axios
      .get(serverGroupsURL, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        console.log();
        const sites = res.data;
        const sitesList = sites.map(({ id, name, created_at, updated_at }) => ({
          id,
          name,
          created_at,
          updated_at,
          active: false
        }));
        setSitesData(sitesList);
      })
      .catch(err => console.log(err));
  };

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
            // getGroupsData();
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
        {activeBookmark && (
          <BookmarkPanel
            id={category_id}
            // getSitesData={getSitesData}
            getGroupsData={getGroupsData}
            getAllSitesData={getAllSitesData}
            // sitesData={sitesData}
            groupsData={groupsData}
            allSitesData={allSitesData}
          />
        )}
        {activeSettings && <SettingsPanel />}
      </div>
    </li>
  );
}

export default Card;

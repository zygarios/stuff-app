import React, { useState, useEffect } from "react";
import "../Sass/BookmarkPanel.scss";
import GroupsPanel from "./GroupsPanel";
import SitesPanel from "./SitesPanel";
import PopUpPanel from "./PopUpPanel";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

function BookmarkPanel({ category_id, statusChanger, activeBookmark, name }) {
  const [groupsData, setGroupsData] = useState(null);
  const [sitesData, setSitesData] = useState(null);
  const [groupIdActive, setGroupIdActive] = useState(0);
  const [siteIdActive, setSiteIdActive] = useState(0);
  const [popUpActiveType, setPopUpActiveType] = useState(false);
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

  useEffect(() => {
    getGroupsData(category_id);
    getSitesData(groupIdActive);
    moveScreenToActiveCard();
  }, [groupIdActive, siteIdActive, category_id]);

  const moveScreenToActiveCard = () => {
    const bookmarkPosTop = document
      .querySelector(".active-bookmark")
      .getBoundingClientRect().top;
    const scrollValue = bookmarkPosTop - 15;
    window.scrollBy(0, scrollValue);
  };

  const getGroupsData = category_id => {
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
            updated_at
          })
        );
        groupsList.unshift({
          id: 0,
          name: "Wszystkie zapisane strony"
        });
        groupsList.unshift({ id: -1 });
        setGroupsData(groupsList);
      })
      .catch(err => console.log(err));
  };
  const getSitesData = (group_id = 0) => {
    const token = localStorage.getItem("access_token");
    let serverSitesURL = "";
    if (group_id === 0) {
      serverSitesURL = `${serverCategoriesURL}/${category_id}/sites`;
    } else if (group_id > 0) {
      serverSitesURL = `${serverCategoriesURL}/${category_id}/groups/${group_id}/sites`;
    }
    axios
      .get(serverSitesURL, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        const sites = res.data;
        const sitesList = sites.map(
          ({
            id,
            name,
            created_at,
            updated_at,
            notes,
            url,
            group_id,
            important
          }) => ({
            id,
            name,
            notes,
            url,
            group_id,
            created_at,
            updated_at,
            important
          })
        );

        setSitesData(sitesList);
      })
      .catch(err => console.log(err));
  };
  const handleOpenPopPanel = () => {
    let site = null;
    if (popUpActiveType === "site" || popUpActiveType === "note") {
      site = sitesData.find(site => site.id === siteIdActive);
    }
    return (
      <PopUpPanel
        getGroupsData={getGroupsData}
        getSitesData={getSitesData}
        category_id={category_id}
        setPopUpActiveType={setPopUpActiveType}
        popUpActiveType={popUpActiveType}
        groupIdActive={groupIdActive}
        siteIdActive={siteIdActive}
        site={site}
      />
    );
  };
  return (
    <div className="bookmark-panel" onClick={() => moveScreenToActiveCard()}>
      {popUpActiveType && handleOpenPopPanel()}
      <div
        className="home-icon-click"
        style={!activeBookmark || popUpActiveType ? { display: "none" } : null}
        onClick={() => {
          statusChanger(category_id, "home");
        }}>
        <FontAwesomeIcon icon={faShare} />
      </div>
      <h2 className="bookmark-panel__category-title">{name}</h2>
      {groupsData && (
        <GroupsPanel
          getSitesData={getSitesData}
          getGroupsData={getGroupsData}
          category_id={category_id}
          groupsData={groupsData}
          groupIdActive={groupIdActive}
          setPopUpActiveType={setPopUpActiveType}
          setGroupIdActive={setGroupIdActive}
        />
      )}
      {sitesData && (
        <SitesPanel
          groupsData={groupsData}
          getSitesData={getSitesData}
          getGroupsData={getGroupsData}
          sitesData={sitesData}
          groupIdActive={groupIdActive}
          setPopUpActiveType={setPopUpActiveType}
          setSiteIdActive={setSiteIdActive}
          setGroupIdActive={setGroupIdActive}
          category_id={category_id}
        />
      )}
    </div>
  );
}

export default BookmarkPanel;

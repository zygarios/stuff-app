import React, { useState, useEffect } from "react";
import "../Sass/BookmarkPanel.scss";
import GroupsPanel from "./GroupsPanel";
import SitesPanel from "./SitesPanel";
import axios from "axios";

function BookmarkPanel({ category_id }) {
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";
  const [groupsData, setGroupsData] = useState([]);
  const [sitesData, setSitesData] = useState([]);
  const [allSitesData, setAllSitesData] = useState([]);

  useEffect(() => moveScreenToActiveCard(), []);
  useEffect(() => getGroupsData(), []);

  const moveScreenToActiveCard = () => {
    const bookmarkPosTop = document
      .querySelector(".active-bookmark")
      .getBoundingClientRect().top;
    const scrollValue = bookmarkPosTop - 75;
    window.scrollBy(0, scrollValue);
  };

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
        groupsList.unshift({ id: 0, name: "Wszystkie strony", active: true });
        groupsList.unshift({ id: -1, active: false });
        setGroupsData(groupsList);
      })
      .catch(err => console.log(err));
  };

  const getAllSitesData = () => {
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
        const sites = res.data;
        const sitesList = sites.map(
          ({ id, name, notes, url, created_at, updated_at }) => ({
            id,
            name,
            notes,
            url,
            created_at,
            updated_at,
            active: false
          })
        );

        sitesList.unshift({ id: -1, active: false });
        setAllSitesData(sitesList);
      })
      .catch(err => console.log(err));
  };

  const getSitesData = group_id => {
    const token = localStorage.getItem("access_token");
    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups/${group_id}/sites`;
    axios
      .get(serverGroupsURL, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
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

  const handleChangeActiveGroup = id => {
    const activeGroupUpdate = groupsData.map(group => {
      if (group.id === id) {
        return (group.active = true);
      } else {
        return (group.active = false);
      }
    });
    setGroupsData(activeGroupUpdate);
  };

  return (
    <div className="bookmark-panel" onClick={() => moveScreenToActiveCard()}>
      <h2 className="bookmark-panel__category-title">
        {"Podróże kulinarne i jedzonko oraz tozne fajnes"}
      </h2>
      <GroupsPanel
        groupsData={groupsData}
        handleChangeActiveGroup={handleChangeActiveGroup}
      />
      <SitesPanel />
    </div>
  );
}

export default BookmarkPanel;

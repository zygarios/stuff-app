import React, { useState, useEffect } from "react";
import "../Sass/BookmarkPanel.scss";
import GroupsPanel from "./GroupsPanel";
import SitesPanel from "./SitesPanel";
import axios from "axios";

function BookmarkPanel({ category_id }) {
  const [groupsData, setGroupsData] = useState(null);
  const [sitesData, setSitesData] = useState(null);
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

  useEffect(() => moveScreenToActiveCard());

  useEffect(() => {
    getGroupsData(category_id);
  }, []);

  useEffect(() => {
    getSitesData();
  }, []);

  const moveScreenToActiveCard = () => {
    const bookmarkPosTop = document
      .querySelector(".active-bookmark")
      .getBoundingClientRect().top;
    const scrollValue = bookmarkPosTop - 75;
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
          ({ id, name, created_at, updated_at, notes, url }) => ({
            id,
            name,
            notes,
            url,
            created_at,
            updated_at,
            active: false
          })
        );
        setSitesData(sitesList);
      })
      .catch(err => console.log(err));
  };

  const handleChangeActiveGroup = id => {
    let idActiveEl = null;
    const activeGroupUpdate = groupsData.map(group => {
      if (group.id === id) {
        idActiveEl = group.id;
        group.active = true;
      } else {
        group.active = false;
      }
      return group;
    });

    setGroupsData(activeGroupUpdate);
    if (idActiveEl === undefined || idActiveEl === -1) {
      return;
    } else if (idActiveEl === 0) {
      getSitesData();
    } else {
      getSitesData(idActiveEl);
    }
  };

  return (
    <div className="bookmark-panel" onClick={() => moveScreenToActiveCard()}>
      <h2 className="bookmark-panel__category-title">
        {"Podróże kulinarne i jedzonko oraz tozne fajnes"}
      </h2>

      {groupsData && (
        <GroupsPanel
          groupsData={groupsData}
          handleChangeActiveGroup={handleChangeActiveGroup}
        />
      )}
      {sitesData && <SitesPanel sitesData={sitesData} />}
    </div>
  );
}

export default BookmarkPanel;

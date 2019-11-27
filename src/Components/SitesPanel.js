import React from "react";
import SiteItem from "./SiteItem";
import "../Sass/SitesPanel.scss";
import EmptySiteItem from "./EmptySiteItem";

function SitesPanel({
  sitesData,
  groupIdActive,
  setPopUpActiveType,
  setSiteIdActive,
  setGroupIdActive,
  getSitesData,
  groupsData,
  category_id
}) {
  const sites = sitesData.map(siteData => {
    return (
      <SiteItem
        key={siteData.id}
        site_id={siteData.id}
        siteData={siteData}
        setPopUpActiveType={setPopUpActiveType}
        setSiteIdActive={setSiteIdActive}
        setGroupIdActive={setGroupIdActive}
        getSitesData={getSitesData}
        group_id={siteData.group_id}
        category_id={category_id}
        groupIdActive={groupIdActive}
      />
    );
  });
  let group = null;
  if (groupsData) {
    group = groupsData.find(group => group.id === groupIdActive);
  }

  return (
    <div className="sites-panel">
      <ul className="sites-panel__list">
        <div className="sites-panel__header-wrapper">
          <div className="sites-panel__group-name site">
            {group ? group.name : "Brak zapisanych stron"}
          </div>
          {!(groupIdActive === 0) && (
            <EmptySiteItem
              setPopUpActiveType={setPopUpActiveType}
              setSiteIdActive={setSiteIdActive}
            />
          )}
        </div>
        {sites}
      </ul>
    </div>
  );
}

export default SitesPanel;

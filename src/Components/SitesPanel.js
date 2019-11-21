import React from "react";
import SiteItem from "./SiteItem";
import "../Sass/SitesPanel.scss";
import EmptySiteItem from "./EmptySiteItem";

function SitesPanel({
  sitesData,
  groupIdActive,
  setPopUpActiveType,
  setSiteIdActive,
  setSiteNote,
  setGroupIdActive
}) {
  const sites = sitesData.map(siteData => {
    return (
      <SiteItem
        key={siteData.id}
        siteData={siteData}
        setPopUpActiveType={setPopUpActiveType}
        setSiteIdActive={setSiteIdActive}
        setSiteNote={setSiteNote}
        setGroupIdActive={setGroupIdActive}
        group_id={siteData.group_id}
      />
    );
  });
  return (
    <div className="sites-panel">
      <ul className="sites-panel__list">
        {!(groupIdActive === 0) && (
          <EmptySiteItem
            setPopUpActiveType={setPopUpActiveType}
            setSiteIdActive={setSiteIdActive}
          />
        )}
        {sites}
      </ul>
    </div>
  );
}

export default SitesPanel;

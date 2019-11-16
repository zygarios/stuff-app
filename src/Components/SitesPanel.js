import React from "react";
import SiteItem from "./SiteItem";
import "../Sass/SitesPanel.scss";
import EmptySiteItem from "./EmptySiteItem";

function SitesPanel({ sitesData, setPopUpActiveType }) {
  const sites = sitesData.map(siteData => {
    return (
      <SiteItem
        key={siteData.id}
        siteData={siteData}
        setPopUpActiveType={setPopUpActiveType}
      />
    );
  });
  return (
    <div className="sites-panel">
      <ul className="sites-panel__list">
        <EmptySiteItem setPopUpActiveType={setPopUpActiveType} />
        {sites}
      </ul>
    </div>
  );
}

export default SitesPanel;

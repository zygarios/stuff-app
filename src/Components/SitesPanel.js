import React from "react";
import SiteItem from "./SiteItem";
import "../Sass/SitesPanel.scss";

function SitesPanel({ sitesData, setIsPopUpPanelActive }) {
  const sites = sitesData.map(siteData => {
    return (
      <SiteItem
        key={siteData.id}
        siteData={siteData}
        setIsPopUpPanelActive={setIsPopUpPanelActive}
      />
    );
  });
  return (
    <div className="sites-panel">
      <ul className="sites-panel__list">{sites}</ul>
    </div>
  );
}

export default SitesPanel;

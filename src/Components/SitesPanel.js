import React from "react";
import SiteItem from "./SiteItem";
import "../Sass/SitesPanel.scss";

function SitesPanel({ siteData }) {
  // const { siteURL, name, updateTime } = siteData;
  // const sites = sitesData.map(siteData => (
  //   <SiteItem key={siteData.id} siteData={siteData} />
  // ));
  return (
    <div className="sites-panel">
      <ul className="sites-panel__list">{}</ul>
    </div>
  );
}

export default SitesPanel;

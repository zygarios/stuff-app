import React from "react";
import "../Sass/SiteItem.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

function SiteItem({ siteData, setIsPopUpPanelActive }) {
  const { url, notes, name, updateTime } = siteData;
  return (
    <div className="site" onClick={() => setIsPopUpPanelActive(true)}>
      <img
        className="site__favicon"
        src={"https://www.google.com/s2/favicons?domain=" + url}
        alt="favicon-website"
      />
      <h3 className="site__name">{name}</h3>
      <p className="site__update-time">{updateTime}</p>
      <a
        className="site__link"
        href={url}
        target="_blank"
        rel="nofollow noreferrer noopener"
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </a>
    </div>
  );
}

export default SiteItem;

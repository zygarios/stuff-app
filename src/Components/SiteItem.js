import React from "react";
import "../Sass/SiteItem.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

function SiteItem({ siteData }) {
  const { siteURL, name, updateTime } = siteData;
  return (
    <div className="site">
      <img
        className="site__favicon"
        src={"http://www.google.com/s2/favicons?domain=" + siteURL}
        alt="favicon-website"
      />
      <h3 className="site__name">{name}</h3>
      <p className="site__update-time">{updateTime}</p>
      <a
        className="site__link"
        href={siteURL}
        target="_blank"
        rel="nofollow noreferrer noopener"
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </a>
    </div>
  );
}

export default SiteItem;

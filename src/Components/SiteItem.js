import React from "react";
import "../Sass/SiteItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faAngleDoubleRight,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function SiteItem({
  siteData,
  setPopUpActiveType,
  setSiteIdActive,
  category_id,
  group_id,
  site_id,
  getSitesData,
  groupIdActive
}) {
  const { url, name, updated_at, id, important, notes } = siteData;
  const handleChangeImportantIcon = () => {
    const serverCategoriesURL = "https://jimmyspage.pl/api/categories";
    const serverSiteURL = `${serverCategoriesURL}/${category_id}/groups/${group_id}/sites/${site_id}`;
    const token = localStorage.getItem("access_token");
    const formDataSite = new FormData();
    formDataSite.set("_method", "put");
    formDataSite.set("important", Number(important) ? "0" : "1");

    axios
      .post(serverSiteURL, formDataSite, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        getSitesData(groupIdActive);
      })
      .catch(err => console.log(err));
  };
  return (
    <div
      className="site"
      onClick={e => {
        setSiteIdActive(id);
        setPopUpActiveType("note");
      }}>
      <div
        className="site__favicon"
        onClick={e => {
          e.stopPropagation();
          handleChangeImportantIcon();
        }}>
        <img
          src={"https://www.google.com/s2/favicons?domain=" + url}
          alt="favicon-website"
        />
        <span
          className="site__important-alert"
          style={{ opacity: Boolean(Number(important)) && 1 }}>
          <FontAwesomeIcon icon={faBookmark} />
        </span>
      </div>
      <h3 className="site__name">{name}</h3>
      <p className="site__notes">{notes}</p>
      <p className="site__updated-time">Last update: {updated_at}</p>
      <a
        onClick={e => e.stopPropagation()}
        className="site__link"
        href={url}
        target="_blank"
        rel="nofollow noreferrer noopener">
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </a>
      <button
        className="site__edit"
        onClick={e => {
          e.stopPropagation();
          setSiteIdActive(id);
          setPopUpActiveType("site");
        }}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
}

export default SiteItem;

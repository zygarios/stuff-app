import React from "react";
import "../Sass/SiteItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

function SiteItem({
  siteData,
  setPopUpActiveType,
  setSiteIdActive,
  setSiteNote,
  setGroupIdActive,
  group_id
}) {
  const { url, notes, name, updateTime, id } = siteData;

  return (
    <div
      className="site"
      onClick={() => {
        setSiteIdActive(id);
        setPopUpActiveType("note");
        setGroupIdActive(group_id);
        setSiteNote(notes);
      }}>
      <img
        className="site__favicon"
        src={"https://www.google.com/s2/favicons?domain=" + url}
        alt="favicon-website"
      />
      <h3 className="site__name">{name}</h3>
      <p className="site__update-time">{updateTime}</p>
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
          setGroupIdActive(group_id);
          setPopUpActiveType("site");
        }}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
}

export default SiteItem;

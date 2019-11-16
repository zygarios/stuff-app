import React from "react";
import "../Sass/EmptySiteItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function EmptySiteItem({ setPopUpActiveType }) {
  return (
    <div
      className="site empty-site"
      onClick={() => {
        setPopUpActiveType({ type: "empty-site", data: null });
      }}>
      <FontAwesomeIcon className="empty-site__plus-icon" icon={faPlus} />
    </div>
  );
}

export default EmptySiteItem;

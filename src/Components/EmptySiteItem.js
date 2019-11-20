import React from "react";
import "../Sass/EmptySiteItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function EmptySiteItem({ setPopUpActiveType }) {
  return (
    <div
      className="site empty-site"
      onClick={() => {
        setPopUpActiveType({ type: "site",  });
      }}
    >
      <FontAwesomeIcon className="empty-site__plus-icon" icon={faPlus} />
    </div>
  );
}

export default EmptySiteItem;

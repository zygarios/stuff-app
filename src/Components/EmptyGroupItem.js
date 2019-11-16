import React from "react";
import "../Sass/EmptyGroupItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function EmptyGroupItem({ setPopUpActiveType }) {
  return (
    <li
      className={`group-item empty-group`}
      onClick={() => {
        setPopUpActiveType({ type: "empty-group", data: null });
      }}>
      <FontAwesomeIcon className="empty-group__plus-icon" icon={faPlus} />
    </li>
  );
}

export default EmptyGroupItem;

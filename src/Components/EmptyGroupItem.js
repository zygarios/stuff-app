import React from "react";
import "../Sass/EmptyGroupItem.scss";
import NewGroupPanel from "./NewGroupPanel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function EmptyGroupItem({ groupData, handleChangeActiveGroup }) {
  const { id, active } = groupData;
  return (
    <li
      onClick={() => handleChangeActiveGroup(id)}
      className={`group-item ${active && "active-select"} ${id === -1 &&
        "empty-card"}`}
    >
      {active ? (
        <NewGroupPanel />
      ) : (
        <FontAwesomeIcon className="empty-card__plus-icon " icon={faPlus} />
      )}
    </li>
  );
}

export default EmptyGroupItem;

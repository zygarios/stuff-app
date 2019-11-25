import React from "react";
import "../Sass/GroupItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function GroupItem({
  groupData,
  setPopUpActiveType,
  setGroupIdActive,
  groupIdActive
}) {
  const { id, name } = groupData;
  return (
    <li
      onClick={() => {
        setGroupIdActive(id);
      }}
      className={`group-item ${id === Number(groupIdActive) &&
        "active-select"} ${id === 0 && "all-groups"}`}>
      <p className="group-item__title">
        {name === "Wszystkie zapisane strony" ? "Pokaż wszystkie" : name}
      </p>
      <span
        className="group-item__edit-icon"
        onClick={() => {
          setGroupIdActive(id);
          setPopUpActiveType("group");
        }}>
        <FontAwesomeIcon icon={faEdit} />
      </span>
    </li>
  );
}

export default GroupItem;

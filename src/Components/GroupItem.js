import React from "react";
import "../Sass/GroupItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function GroupItem({
  groupData,
  groupsDataLength,
  setPopUpActiveType,
  setGroupIdActive,
  groupIdActive
}) {
  const { id, name } = groupData;
  let groupName = name;
  if (id === 0 && groupsDataLength <= 2) {
    groupName = "Brak grup";
  }
  return (
    <li
      onClick={() => {
        setGroupIdActive(id);
      }}
      className={`group-item ${id === Number(groupIdActive) &&
        "active-select"} ${id === 0 && "all-groups"}`}>
      <p className="group-item__title">{groupName}</p>
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

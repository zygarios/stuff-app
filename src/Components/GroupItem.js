import React from "react";
import "../Sass/GroupItem.scss";

function GroupsItem({ groupData, handleChangeActiveGroup }) {
  const { id, active, name } = groupData;
  return (
    <li
      onClick={() => handleChangeActiveGroup(id)}
      className={`group-item ${active && "active-select"}`}>
      <p className="group-item__title">{name}</p>
    </li>
  );
}

export default GroupsItem;

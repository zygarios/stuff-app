import React from "react";
import "../Sass/GroupItem.scss";

function GroupsItem({ groupData, handleChangeActiveGroup }) {
  const { id, name, active } = groupData;

  return (
    <li
      onClick={() => handleChangeActiveGroup(id)}
      className={`group-item ${active && "active-select"}`}
    >
      {name}
    </li>
  );
}

export default GroupsItem;

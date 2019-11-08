import React from "react";
import "../Sass/EmptyGroupItem.scss";

function EmptyGroupItem({ groupData, handleChangeActiveGroup }) {
  const { id, active } = groupData;
  return (
    <li
      onClick={() => handleChangeActiveGroup(id)}
      className={`group-item ${active && "active-select"} ${id === -1 &&
        "group-item--empty"}`}>
      {"I"}
    </li>
  );
}

export default EmptyGroupItem;

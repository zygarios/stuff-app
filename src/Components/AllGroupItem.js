import React from "react";

function AllGroupItem({ groupData, handleChangeActiveGroup }) {
  const { id, active, name } = groupData;
  return (
    <li
      onClick={() => handleChangeActiveGroup(id)}
      className={`group-item ${active && "active-select"}`}
    >
      {name}
    </li>
  );
}

export default AllGroupItem;

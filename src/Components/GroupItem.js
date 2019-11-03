import React, { useEffect, useState } from "react";
import "../Sass/GroupItem.scss";

function GroupItem({ groupData, getSitesData }) {
  const { id, name, active } = groupData;
  return (
    <li
      onClick={() => getSitesData(id)}
      className={`group-item ${true && "active-select"}`}>
      {name}
    </li>
  );
}

export default GroupItem;

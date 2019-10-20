import React, { useEffect, useState } from "react";
import "../Sass/GroupItem.scss";

function GroupItem({
  groupName = "costam costam costamasdasd as afd sf sdf ad f s"
}) {
  return <li className="group-item">{groupName}</li>;
}

export default GroupItem;

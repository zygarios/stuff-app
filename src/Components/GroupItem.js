import React from "react";
import "../Sass/GroupItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function GroupItem({ groupData, handleChangeActiveGroup, setPopUpActiveType }) {
  const { id, active, name } = groupData;
  return (
    <li
      onClick={() => {
        handleChangeActiveGroup(id);
      }}
      className={`group-item ${active && "active-select"} ${id === 0 &&
        "all-groups"}`}
    >
      <p className="group-item__title">{name}</p>
      <span
        className="group-item__edit-icon"
        onClick={() =>
          setPopUpActiveType({
            type: "group",
            data: groupData,
            group_id: id
          })
        }
      >
        <FontAwesomeIcon icon={faEdit} />
      </span>
    </li>
  );
}

export default GroupItem;

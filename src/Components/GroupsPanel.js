import React, { useState } from "react";
import GroupItem from "./GroupItem";
import "../Sass/GroupsPanel.scss";
import EmptyGroupItem from "./EmptyGroupItem";

function GroupsPanel({
  groupsData,
  category_id,
  handleChangeActiveGroup,
  setPopUpActiveType
}) {
  const [isHoverOnGroupItem, setIsHoverOnGroupItem] = useState(false);

  const handleGroupListEnter = () => {
    if (window.innerWidth < 576) return;
    setIsHoverOnGroupItem(true);
  };
  const handleGroupListLeave = () => {
    if (window.innerWidth < 576) return;
    setIsHoverOnGroupItem(false);
  };

  const groupsItems = groupsData.map(groupData => {
    if (groupData.id === -1) {
      return (
        <EmptyGroupItem
          key={groupData.id}
          setPopUpActiveType={setPopUpActiveType}
        />
      );
    } else {
      return (
        <GroupItem
          key={groupData.id}
          groupData={groupData}
          handleChangeActiveGroup={handleChangeActiveGroup}
          setPopUpActiveType={setPopUpActiveType}
        />
      );
    }
  });
  return (
    <div
      className="groups-panel"
      onMouseEnter={handleGroupListEnter}
      onMouseLeave={handleGroupListLeave}
      style={{ width: isHoverOnGroupItem && "50%" }}
    >
      <ul className="groups-panel__list">{groupsItems}</ul>
    </div>
  );
}

export default GroupsPanel;

import React, { useState } from "react";
import GroupItem from "./GroupItem";
import "../Sass/GroupsPanel.scss";
import EmptyGroupItem from "./EmptyGroupItem";

function GroupsPanel({ groupsData, handleChangeActiveGroup }) {
  const [isHoverOnGroupItem, setIsHoverOnGroupItem] = useState(false);

  const handleGroupListEnter = () => {
    if (window.innerWidth < 768) return;
    setIsHoverOnGroupItem(true);
  };
  const handleGroupListLeave = () => {
    if (window.innerWidth < 768) return;
    setIsHoverOnGroupItem(false);
  };

  const groupsItems = groupsData.map(groupData => {
    if (groupData.id === -1) {
      return (
        <EmptyGroupItem
          key={groupData.id}
          groupData={groupData}
          handleChangeActiveGroup={handleChangeActiveGroup}
        />
      );
    } else {
      return (
        <GroupItem
          key={groupData.id}
          groupData={groupData}
          handleChangeActiveGroup={handleChangeActiveGroup}
        />
      );
    }
  });
  return (
    <div
      className="groups-panel"
      onMouseEnter={handleGroupListEnter}
      onMouseLeave={handleGroupListLeave}
      style={{ width: isHoverOnGroupItem && "350px" }}>
      <ul
        className="groups-panel__list"
        // style={{ width: isHoverOnGroupItem && `${groupWidth + 30}px` }}
      >
        {groupsItems}
      </ul>
    </div>
  );
}

export default GroupsPanel;

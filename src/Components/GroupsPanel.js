import React, { useState } from "react";
import GroupItem from "./GroupItem";
import "../Sass/GroupsPanel.scss";
import EmptyGroupItem from "./EmptyGroupItem";

function GroupsPanel({
  groupsData,
  setPopUpActiveType,
  setGroupIdActive,
  groupIdActive
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
          groupIdActive={groupIdActive}
          setGroupIdActive={setGroupIdActive}
        />
      );
    } else {
      return (
        <GroupItem
          groupIdActive={groupIdActive}
          setGroupIdActive={setGroupIdActive}
          key={groupData.id}
          groupData={groupData}
          setPopUpActiveType={setPopUpActiveType}
          groupsDataLength={groupsData.length}
        />
      );
    }
  });
  return (
    <div
      className="groups-panel"
      onMouseEnter={handleGroupListEnter}
      onMouseLeave={handleGroupListLeave}
      style={{ width: isHoverOnGroupItem && "40%" }}>
      <ul className="groups-panel__list">{groupsItems}</ul>
    </div>
  );
}

export default GroupsPanel;

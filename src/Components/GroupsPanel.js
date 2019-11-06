import React, { useState } from "react";
import GroupItem from "./GroupItem";
import "../Sass/GroupsPanel.scss";
import AllGroupItem from "./AllGroupItem";

function GroupsPanel({ groupsData, handleChangeActiveGroup }) {
  // const [isHoverOnGroupItem, setIsHoverOnGroupItem] = useState(false);
  // const [groupWidth, setGroupWidth] = useState(0);

  // const handleGroupListEnter = () => {
  //   if (window.innerWidth < "576px") console.log("c");
  //   setIsHoverOnGroupItem(true);
  //   const groupItems = document.querySelectorAll(".group-item");
  //   let groupItemsWidth = [];
  //   groupItems.forEach(item => {
  //     item.style.position = "static";
  //     groupItemsWidth.push(item.getBoundingClientRect().width);
  //   });
  //   const groupItemWidthMax = Math.max.apply(null, groupItemsWidth);

  //   setGroupWidth(groupItemWidthMax);
  // };
  // const handleGroupListLeave = e => {
  //   setIsHoverOnGroupItem(false);
  //   const groupItems = document.querySelectorAll(".group-item");
  //   groupItems.forEach(item => {
  //     item.style.position = "relative";
  //   });
  // };
  const groupsItems = groupsData.map(groupData => {
    if (groupData.id === 0) {
      return (
        <AllGroupItem
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
      // style={{ width: isHoverOnGroupItem && `${groupWidth + 30}px` }}
      // onMouseEnter={handleGroupListEnter}
      // onMouseLeave={handleGroupListLeave}
      // onTouchStart={handleGroupListTouchStart}
      // onTouchMove={handleGroupListTouchMove}
      // onTouchEnd={handleGroupListTouchEnd}
    >
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

import React, { useState, useEffect } from "react";
import "../Sass/BookmarkPanel.scss";
import GroupItem from "./GroupItem";
import SiteItem from "./SiteItem";
import AllGroupItem from "./AllGroupItem";

function BookmarkPanel({
  id,
  getSitesData,
  groupsData,
  setGroupsData,
  sitesData,
  setSitesData
}) {
  const [isHoverOnGroupItem, setIsHoverOnGroupItem] = useState(false);
  const [groupWidth, setGroupWidth] = useState(0);

  useEffect(() => moveScreenToActiveCard(), []);

  const handleGroupListEnter = () => {
    if (window.innerWidth < "576px") console.log("c");
    setIsHoverOnGroupItem(true);
    const groupItems = document.querySelectorAll(".group-item");
    let groupItemsWidth = [];
    groupItems.forEach(item => {
      item.style.position = "static";
      groupItemsWidth.push(item.getBoundingClientRect().width);
    });
    const groupItemWidthMax = Math.max.apply(null, groupItemsWidth);

    setGroupWidth(groupItemWidthMax);
  };
  const handleGroupListLeave = e => {
    setIsHoverOnGroupItem(false);
    const groupItems = document.querySelectorAll(".group-item");
    groupItems.forEach(item => {
      item.style.position = "relative";
    });
  };

  // const handleGroupListTouchStart = () => {
  //   setIsHoverOnGroupItem(true);
  // };
  // const handleGroupListTouchEnd = () => {
  //   setIsHoverOnGroupItem(true);
  // };

  // const handleGroupListTouchMove = e => {
  //   setGroupWidth(e.touches[0].clientX);
  // };

  const moveScreenToActiveCard = () => {
    const bookmarkPosTop = document
      .querySelector(".active-bookmark")
      .getBoundingClientRect().top;
    const scrollValue = bookmarkPosTop - 75;
    window.scrollBy(0, scrollValue);
  };

  const groups = groupsData.map(groupData => (
    <GroupItem
      key={groupData.id}
      getSitesData={getSitesData}
      groupData={groupData}
    />
  ));
  const sites = sitesData.map(siteData => (
    <SiteItem key={siteData.id} siteData={siteData} />
  ));

  return (
    <div className="bookmark-panel" onClick={() => moveScreenToActiveCard()}>
      <h2 className="bookmark-panel__category-title">
        {"Podróże kulinarne i jedzonko oraz tozne fajnes"}
      </h2>
      <div
        className="bookmark-panel__groups-list"
        style={{ width: isHoverOnGroupItem && `${groupWidth + 30}px` }}
        onMouseEnter={handleGroupListEnter}
        onMouseLeave={handleGroupListLeave}
        // onTouchStart={handleGroupListTouchStart}
        // onTouchMove={handleGroupListTouchMove}
        // onTouchEnd={handleGroupListTouchEnd}
      >
        <ul
          className="bookmark-panel__groups-list-ul"
          style={{ width: isHoverOnGroupItem && `${groupWidth + 30}px` }}>
          <AllGroupItem />
          {groups}
        </ul>
      </div>
      <div className="bookmark-panel__sites">
        <ul className="bookmark-panel__sites-ul">{sites}</ul>
      </div>
    </div>
  );
}

export default BookmarkPanel;

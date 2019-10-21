import React, { useState, useEffect } from "react";
import "../Sass/BookmarkPanel.scss";
import GroupItem from "./GroupItem";
import SiteItem from "./SiteItem";

function BookmarkPanel(width) {
  const [isHoverOnGroupItem, setIsHoverOnGroupItem] = useState(false);
  const [groupWidth, setGroupWidth] = useState(0);

  const handleGroupListEnter = () => {
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

  const moveScreenToActiveCard = () => {
    const bookmarkPosTop = document
      .querySelector(".active-bookmark")
      .getBoundingClientRect().top;
    const scrollValue = bookmarkPosTop - 75;
    window.scrollBy(0, scrollValue);
  };

  useEffect(() => moveScreenToActiveCard(), []);

  return (
    <div className="bookmark-panel" onClick={() => moveScreenToActiveCard()}>
      <h2 className="bookmark-panel__category-title">
        {"Podróże kulinarne i jedzonko oraz tozne fajnes"}
      </h2>
      <div
        className="bookmark-panel__groups-list"
        style={{ width: isHoverOnGroupItem && `${groupWidth + 30}px` }}
        onMouseEnter={handleGroupListEnter}
        onMouseLeave={handleGroupListLeave}>
        <ul
          className="bookmark-panel__groups-list-ul"
          style={{ width: isHoverOnGroupItem && `${groupWidth + 30}px` }}>
          <GroupItem groupName="asdasfasnd asndans odnasna n" />
          <GroupItem groupName="asdasa sdasds fasnd asndans odnasna n" />
          <GroupItem groupName="gh ffggh g sd f sdf" />
          <GroupItem groupName="sadfsdfsd " />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="asdasfasnd asndans odnasna n" />
          <GroupItem groupName="asdasa sdasds fasnd asndans odnasna n" />
          <GroupItem groupName="gh ffggh g sd f sdf" />
          <GroupItem groupName="sadfsdfsd " />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="asdasfasnd asndans odnasna n" />
          <GroupItem groupName="asdasa sdasds fasnd asndans odnasna n" />
          <GroupItem groupName="gh ffggh g sd f sdf" />
          <GroupItem groupName="sadfsdfsd " />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="adf asdfasdfs" />
          <GroupItem groupName="adf asdfasdfs" />
        </ul>
      </div>
      <div className="bookmark-panel__sites">
        <ul className="bookmark-panel__sites-ul">
          <SiteItem
            siteData={{
              siteURL: "https://wwwp.wp.pl",
              name: "WirtualnaPolska",
              updateTime: "15:12 18.11.2019"
            }}
          />
          <SiteItem
            siteData={{
              siteURL: "https://wwwp.wp.pl",
              name: "WirtualnaPolska",
              updateTime: "15:12 18.11.2019"
            }}
          />
          <SiteItem
            siteData={{
              siteURL: "https://wwwp.wp.pl",
              name: "WirtualnaPolska",
              updateTime: "15:12 18.11.2019"
            }}
          />
          <SiteItem
            siteData={{
              siteURL: "https://wwwp.wp.pl",
              name: "WirtualnaPolska",
              updateTime: "15:12 18.11.2019"
            }}
          />
          <SiteItem
            siteData={{
              siteURL: "https://wwwp.wp.pl",
              name: "WirtualnaPolska",
              updateTime: "15:12 18.11.2019"
            }}
          />
        </ul>
      </div>
    </div>
  );
}

export default BookmarkPanel;

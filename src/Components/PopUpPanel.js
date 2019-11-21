import React from "react";
import "../Sass/PopUpPanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

import GroupPopUp from "./GroupPopUp";
import SitePopUp from "./SitePopUp";
import NotePopUp from "./NotePopUp";

function PopUpPanel({
  getGroupsData,
  getSitesData,
  setPopUpActiveType,
  popUpActiveType,
  category_id,
  groupIdActive,
  siteIdActive
}) {
  let popUpPanelComponent = null;
  switch (popUpActiveType) {
    case "group":
    case "empty-group":
      popUpPanelComponent = (
        <GroupPopUp
          popUpActiveType={popUpActiveType}
          getGroupsData={getGroupsData}
          getSitesData={getSitesData}
          category_id={category_id}
          groupIdActive={groupIdActive}
          setPopUpActiveType={setPopUpActiveType}
        />
      );
      break;
    case "site":
    case "empty-site":
      popUpPanelComponent = (
        <SitePopUp
          category_id={category_id}
          popUpActiveType={popUpActiveType}
          getGroupsData={getGroupsData}
          getSitesData={getSitesData}
          groupIdActive={groupIdActive}
          siteIdActive={siteIdActive}
          setPopUpActiveType={setPopUpActiveType}
        />
      );
      break;
    case "note-site":
      popUpPanelComponent = <NotePopUp popUpActiveType={popUpActiveType} />;
      break;
    default:
      break;
  }
  return (
    <div className="pop-up-panel">
      <span
        className="pop-up-panel__back-icon"
        onClick={() => setPopUpActiveType(false)}
      >
        <FontAwesomeIcon icon={faShare} />
      </span>
      <div className="pop-up-panel__container">{popUpPanelComponent}</div>
    </div>
  );
}

export default PopUpPanel;

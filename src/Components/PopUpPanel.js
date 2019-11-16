import React from "react";
import "../Sass/PopUpPanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

import EmptyGroupPopUp from "./EmptyGroupPopUp";
import EditGroupPopUp from "./EditGroupPopUp";
import EmptySitePopUp from "./EmptySitePopUp";
import EditSitePopUp from "./EditSitePopUp";
import NotePopUp from "./NotePopUp";

function PopUpPanel({ setPopUpActiveType, popUpActiveType }) {
  let popUpPanelComponent = null;
  switch (popUpActiveType) {
    case "empty-group":
      popUpPanelComponent = (
        <EmptyGroupPopUp setPopUpActiveType={setPopUpActiveType} />
      );
      break;
    case "edit-group":
      popUpPanelComponent = (
        <EditGroupPopUp setPopUpActiveType={setPopUpActiveType} />
      );
      break;
    case "empty-site":
      popUpPanelComponent = (
        <EmptySitePopUp setPopUpActiveType={setPopUpActiveType} />
      );
      break;
    case "edit-site":
      popUpPanelComponent = (
        <EditSitePopUp setPopUpActiveType={setPopUpActiveType} />
      );
      break;
    case "note-site":
      popUpPanelComponent = (
        <NotePopUp setPopUpActiveType={setPopUpActiveType} />
      );
      break;
    default:
      break;
  }
  return (
    <div className="pop-up-panel">
      <span
        className="pop-up-panel__back-icon"
        onClick={() => setPopUpActiveType(false)}>
        <FontAwesomeIcon icon={faShare} />
      </span>
      <div className="pop-up-panel__container">{popUpPanelComponent}</div>
    </div>
  );
}

export default PopUpPanel;

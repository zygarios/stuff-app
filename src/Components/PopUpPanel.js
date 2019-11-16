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
  switch (popUpActiveType.type) {
    case "empty-group":
      popUpPanelComponent = <EmptyGroupPopUp data={popUpActiveType.data} />;
      break;
    case "edit-group":
      popUpPanelComponent = <EditGroupPopUp data={popUpActiveType.data} />;
      break;
    case "empty-site":
      popUpPanelComponent = <EmptySitePopUp data={popUpActiveType.data} />;
      break;
    case "edit-site":
      popUpPanelComponent = <EditSitePopUp data={popUpActiveType.data} />;
      break;
    case "note-site":
      popUpPanelComponent = <NotePopUp data={popUpActiveType.data} />;
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

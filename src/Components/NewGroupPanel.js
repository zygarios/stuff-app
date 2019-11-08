import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "../Sass/NewGroupPanel.scss";

function NewGroupPanel() {
  return (
    <form action="" className="new-group-panel">
      <label className="new-group-panel__edit-text">
        Nazwa grupy
        <input
          type="text"
          className="new-group-panel__text-input"
          // onChange={handleTitleChangerInput}
          // value={titleValueInput}
          // placeholder={titleCategory}
        />
      </label>
      <FontAwesomeIcon className="new-group-panel__edit-send" icon={faCheck} />
    </form>
  );
}

export default NewGroupPanel;

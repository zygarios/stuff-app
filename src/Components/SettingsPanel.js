import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faImages,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import "../Sass/SettingsPanel.scss";

function SettingsPanel() {
  const [categoryTitleStatus, setCategoryTitleStatus] = useState(false);
  const [titleCategory, setTitleCategory] = useState("Nazwa kategorii");
  const [titleValueInput, setTitleValueInput] = useState("");

  const handleEditTextButton = () => {
    setCategoryTitleStatus(state => !state);
  };
  const handleTitleChangerInput = e => {
    setTitleValueInput(e.target.value);
  };

  const handleTitleChangerSend = () => {
    setTitleCategory(titleValueInput);
    setTitleValueInput("");
  };

  return (
    <div className="settings-panel">
      <form action="" className="settings-panel__edit-wrapper">
        <FontAwesomeIcon
          className="settings-panel__edit-text"
          icon={faAlignLeft}
          onClick={handleEditTextButton}
        />

        <label
          className={`settings-panel__edit-group ${categoryTitleStatus &&
            "settings-panel__edit-group--active"}`}>
          <FontAwesomeIcon
            className="settings-panel__edit-send"
            icon={faCheck}
            onClick={handleTitleChangerSend}
          />
          <input
            type="text"
            className="settings-panel__text-input"
            onChange={handleTitleChangerInput}
            value={titleValueInput}
            placeholder={titleCategory}
          />
        </label>
      </form>

      <form action="" className="settings-panel__upload-wrapper">
        <input type="file" className="settings-panel__file-input" />
        <FontAwesomeIcon
          className="settings-panel__upload-img"
          icon={faImages}
        />
      </form>
    </div>
  );
}

export default SettingsPanel;

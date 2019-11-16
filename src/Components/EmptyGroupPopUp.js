import React, { useState } from "react";
import "../Sass/EmptyGroupPopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EmptyGroupPopUp() {
  const [groupName, setGroupName] = useState("");
  return (
    <div className="empty-group-pop-up">
      <form className="empty-group-pop-up__form">
        <label htmlFor="group-name" className="empty-group-pop-up__name">
          Nazwa grupy:
          <input
            id="group-name"
            type="text"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            className="empty-group-pop-up__name-input"
            placeholder="Wprowadź nazwę"
          />
        </label>
        <span className="empty-group-pop-up__accept-icon">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </form>
    </div>
  );
}

export default EmptyGroupPopUp;

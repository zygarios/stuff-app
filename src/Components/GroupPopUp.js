import React, { useState } from "react";
import "../Sass/GroupPopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EmptyGroupPopUp() {
  const [groupName, setGroupName] = useState("");
  return (
    <div className="group-pop-up">
      <form className="group-pop-up__form">
        <label htmlFor="group-name" className="group-pop-up__name">
          Nazwa grupy:
          <input
            id="group-name"
            type="text"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            className="group-pop-up__name-input"
            placeholder="Wprowadź nazwę"
          />
        </label>
        <span className="group-pop-up__accept-icon">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </form>
    </div>
  );
}

export default EmptyGroupPopUp;

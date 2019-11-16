import React, { useState } from "react";
import "../Sass/NotePopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function NotePopUp({ data }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [textValue, setTextValue] = useState("");

  return (
    <div className="note-pop-up">
      <span
        className="note-pop-up__edit-switch"
        style={{
          color: isEditOpen && "white",
          transform: isEditOpen && "scale(1.3)"
        }}
        onClick={() => setIsEditOpen(prev => !prev)}>
        <FontAwesomeIcon icon={faEdit} />
      </span>
      {isEditOpen ? (
        <textarea
          className="note-pop-up__text-area"
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
        />
      ) : (
        data
      )}
    </div>
  );
}

export default NotePopUp;

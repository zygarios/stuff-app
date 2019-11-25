import React, { useState } from "react";
import "../Sass/NotePopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function NotePopUp({
  site = null,
  category_id,
  groupIdActive,
  siteIdActive,
  getSitesData,
  getGroupsData
}) {
  let note = "";
  if (site.notes) {
    note = site.notes;
  }
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [textValue, setTextValue] = useState(note);
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

  const handleShowNotes = () => {
    const formDataSite = new FormData();
    formDataSite.set("notes", textValue);
    formDataSite.set("_method", "put");

    const serverSiteURL = `${serverCategoriesURL}/${category_id}/groups/${groupIdActive}/sites/${siteIdActive}`;
    const token = localStorage.getItem("access_token");
    axios
      .post(serverSiteURL, formDataSite, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        getGroupsData(category_id);
        getSitesData();
        setIsEditOpen(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="note-pop-up">
      <span
        className="note-pop-up__edit-switch"
        style={{
          color: isEditOpen && "white"
        }}
        onClick={() => setIsEditOpen(prev => !prev)}>
        <FontAwesomeIcon icon={faEdit} />
      </span>
      {isEditOpen && (
        <FontAwesomeIcon
          icon={faCheck}
          className="note-pop-up__accept-edit-switch"
          onClick={handleShowNotes}
        />
      )}
      {isEditOpen ? (
        <textarea
          autoFocus
          className="note-pop-up__text-area"
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
        />
      ) : (
        note
      )}
    </div>
  );
}

export default NotePopUp;

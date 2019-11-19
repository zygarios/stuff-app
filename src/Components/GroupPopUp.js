import React, { useState } from "react";
import "../Sass/GroupPopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function GroupPopUp({
  setPopUpActiveType,
  category_id,
  getGroupsData,
  getSitesData,
  popUpActiveType
}) {
  const [groupName, setGroupName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

  const newGroup = () => {
    const formDataCategory = new FormData();
    formDataCategory.set("name", groupName);

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups`;
    const token = localStorage.getItem("access_token");
    axios
      .post(serverGroupsURL, formDataCategory, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        setPopUpActiveType(false);
        getGroupsData(category_id);
        getSitesData();
      })
      .catch(err => console.log(err));
  };

  const updateGroup = () => {
    const formDataCategory = new FormData();
    formDataCategory.set("name", groupName);
    formDataCategory.set("_method", "put");

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups/${
      popUpActiveType.group_id
    }`;
    const token = localStorage.getItem("access_token");

    axios
      .post(serverGroupsURL, formDataCategory, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        setPopUpActiveType(false);
        getGroupsData(category_id);
        getSitesData();
      })
      .catch(err => console.log(err));
  };

  const editTypeChanger = () => {
    if (groupName.length === 0) {
      setAlertMessage("Musisz podać nazwę");
      return;
    } else if (groupName.length < 3) {
      setAlertMessage("Za krótka nazwa");
      return;
    } else if (groupName.length > 35) {
      setAlertMessage("Za długa nazwa");
      return;
    }
    if (popUpActiveType.type === "empty-group") {
      newGroup();
    } else if (popUpActiveType.type === "edit-group") {
      updateGroup();
    }
  };

  return (
    <div className="group-pop-up">
      <form
        className="group-pop-up__form"
        onSubmit={e => {
          e.preventDefault();
          editTypeChanger();
        }}
      >
        <label htmlFor="group-name" className="group-pop-up__name">
          Nazwa grupy:
          <input
            id="group-name"
            type="text"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            className="group-pop-up__name-input"
            placeholder={"Wprowadź nazwę"}
          />
        </label>
        <span className="group-pop-up__alert">{alertMessage}</span>
        <span className="group-pop-up__accept-icon" onClick={editTypeChanger}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </form>
    </div>
  );
}

export default GroupPopUp;

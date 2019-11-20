import React, { useState } from "react";
import "../Sass/GroupPopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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
  const [deleteAlertStatus, setDeleteAlertStatus] = useState(false);
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

  const newGroup = () => {
    const formDataGroup = new FormData();
    formDataGroup.set("name", groupName);

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups`;
    const token = localStorage.getItem("access_token");

    axios
      .post(serverGroupsURL, formDataGroup, {
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
    const formDataGroup = new FormData();
    formDataGroup.set("name", groupName);
    formDataGroup.set("_method", "put");

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups/${
      popUpActiveType.group_id
    }`;
    const token = localStorage.getItem("access_token");

    axios
      .post(serverGroupsURL, formDataGroup, {
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

  const deleteGroup = () => {
    if (!deleteAlertStatus) return;

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups/${
      popUpActiveType.group_id
    }`;
    const token = localStorage.getItem("access_token");

    axios
      .delete(serverGroupsURL, {
        headers: {
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
    if (deleteAlertStatus) {
      deleteGroup();
      setDeleteAlertStatus(false);
    }
    if (groupName.length === 0) {
      setAlertMessage("Podaj nazwę grupy");
      return;
    } else if (groupName.length < 3) {
      setAlertMessage("Za krótka nazwa");
      return;
    } else if (groupName.length > 3) {
      setAlertMessage("Za długa nazwa");
      return;
    }
    if (!popUpActiveType.data) {
      newGroup();
    } else if (popUpActiveType.type) {
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
            autoFocus
            id="group-name"
            type="text"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            className="group-pop-up__name-input"
            placeholder="Wprowadź nazwę"
          />
        </label>
        {alertMessage && (
          <span
            className="group-pop-up__alert"
            style={{ opacity: 1, transform: "scaleY(1)" }}
          >
            {alertMessage}
          </span>
        )}
        <span className="group-pop-up__icons-wrapper">
          <span className="group-pop-up__accept-icon" onClick={editTypeChanger}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {popUpActiveType.group_id && (
            <span
              style={{
                color: deleteAlertStatus && "rgba(255, 0, 0, .5)"
              }}
              className="group-pop-up__delete-icon"
              onClick={() => {
                setDeleteAlertStatus(state => !state);
                setAlertMessage("Na pewno chcesz usunąć grupę?");
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          )}
        </span>
      </form>
    </div>
  );
}

export default GroupPopUp;

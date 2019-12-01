import React, { useState } from "react";
import "../Sass/GroupPopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashAlt,
  faShare
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function GroupPopUp({
  setPopUpActiveType,
  category_id,
  getGroupsData,
  getSitesData,
  popUpActiveType,
  groupIdActive,
  empty
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

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups/${groupIdActive}`;
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

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}/groups/${groupIdActive}`;
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
      return;
    }

    if (groupName.length === 0) {
      return setAlertMessage("Podaj nazwę grupy");
    } else if (groupName.length < 3) {
      return setAlertMessage("Za krótka nazwa");
    } else if (groupName.length > 25) {
      return setAlertMessage("Za długa nazwa");
    }
    if (popUpActiveType === "empty-group") {
      newGroup();
    } else if (popUpActiveType === "group") {
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
        }}>
        {!deleteAlertStatus && (
          <label
            htmlFor="group-name"
            className="group-pop-up__name"
            style={{ opacity: deleteAlertStatus && 0.5 }}>
            Nazwa grupy:
            <input
              autoFocus
              id="group-name"
              type="text"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              className="group-pop-up__name-input"
              placeholder="Wprowadź nazwę"
              disabled={deleteAlertStatus && true}
              style={{ opacity: deleteAlertStatus && 0.5 }}
            />
          </label>
        )}
        {alertMessage && (
          <span className="group-pop-up__alert">{alertMessage}</span>
        )}
        <span className="group-pop-up__icons-wrapper">
          <span className="group-pop-up__accept-icon" onClick={editTypeChanger}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {!empty && (
            <span
              className="group-pop-up__delete-icon"
              onClick={() => {
                setDeleteAlertStatus(state => !state);
                if (deleteAlertStatus) {
                  setAlertMessage("");
                } else if (!deleteAlertStatus) {
                  setAlertMessage("Na pewno chcesz usunąć grupę?");
                }
              }}>
              <FontAwesomeIcon
                icon={deleteAlertStatus ? faShare : faTrashAlt}
              />
            </span>
          )}
        </span>
      </form>
    </div>
  );
}

export default GroupPopUp;

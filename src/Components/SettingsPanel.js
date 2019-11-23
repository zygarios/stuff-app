import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faImage,
  faCheck,
  faBan,
  faCloudUploadAlt,
  faShare,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import "../Sass/SettingsPanel.scss";
import axios from "axios";

function SettingsPanel({ empty, image, category_id, getCardsData, name = "" }) {
  const [categoryTitleStatus, setCategoryTitleStatus] = useState(false);
  const [isImageWrapperOpen, setIsImageWrapperOpen] = useState(false);
  const [isRemoveImage, setIsRemoveImage] = useState(false);
  const [titleCategory, setTitleCategory] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertConfirm, setAlertConfirm] = useState(false);
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";
  const handleEditTextButton = () => {
    setCategoryTitleStatus(state => !state);
  };
  const handleAcceptSettings = () => {
    if (empty) {
      newCategory();
    } else {
      updateCategory();
    }
  };

  const alertPopUp = message => {
    setAlertMessage(message);
    setIsAlertOpen(true);
  };

  const newCategory = () => {
    if (titleCategory.length === 0) {
      alertPopUp("Podaj nazwę");
    } else if (titleCategory.length < 3) {
      alertPopUp("Za krótka nazwa");
      return;
    } else if (titleCategory.length > 15) {
      alertPopUp("Za długa nazwa");
      return;
    } else if (fileInput.size > 5000000) {
      alertPopUp("Za duże zdjęcie");
      return;
    }

    const formDataCategory = new FormData();

    formDataCategory.set("name", titleCategory);
    if (fileInput) formDataCategory.set("image", fileInput);

    const serverGroupsURL = `${serverCategoriesURL}`;
    const token = localStorage.getItem("access_token");
    axios
      .post(serverGroupsURL, formDataCategory, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        getCardsData();
      })
      .catch(err => console.log(err));
  };
  const updateCategory = () => {
    if (!titleCategory && !fileInput && !isRemoveImage) {
      alertPopUp("Nie wprowadzono zmian");
      return;
    }
    if (titleCategory.length > 0 && titleCategory.length < 3) {
      alertPopUp("Za krótka nazwa");
      return;
    } else if (titleCategory.length > 15) {
      alertPopUp("Za długa nazwa");
      return;
    } else if (fileInput.size > 5000000) {
      alertPopUp("Za duże zdjęcie");
      return;
    }

    const formDataCategory = new FormData();

    titleCategory
      ? formDataCategory.set("name", titleCategory)
      : formDataCategory.set("name", name);

    if (isRemoveImage) {
      formDataCategory.set("image", "delete");
    } else if (fileInput) {
      formDataCategory.set("image", fileInput);
    }

    formDataCategory.set("_method", "put");

    const serverGroupsURL = `${serverCategoriesURL}/${category_id}`;
    const token = localStorage.getItem("access_token");

    axios
      .post(serverGroupsURL, formDataCategory, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        getCardsData();
      })
      .catch(err => console.log(err));
  };

  const deleteCategory = () => {
    const serverGroupsURL = `${serverCategoriesURL}/${category_id}`;
    const token = localStorage.getItem("access_token");
    axios
      .delete(serverGroupsURL, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        getCardsData();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="settings-panel">
      {isAlertOpen && (
        <div className="settings-panel__alert">
          <p className="settings-panel__alert-message">{alertMessage}</p>
          {alertConfirm && (
            <span className="settings-panel__alert-confirm-wrapper">
              <FontAwesomeIcon
                className="settings-panel__alert-accept"
                icon={faCheck}
                onClick={deleteCategory}
              />
              <FontAwesomeIcon
                className="settings-panel__alert-cancel"
                icon={faShare}
                onClick={() => {
                  setIsAlertOpen(false);
                }}
              />
            </span>
          )}
          <span
            className="settings-panel__alert-back-icon"
            onClick={() => {
              setIsAlertOpen(false);
            }}>
            {!alertConfirm && <FontAwesomeIcon icon={faShare} />}
          </span>
        </div>
      )}
      {!empty && (
        <span
          className="settings-panel__delete-category"
          onClick={() => {
            setAlertConfirm(true);
            alertPopUp("Usunąć kategorię?");
          }}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      )}
      <FontAwesomeIcon
        className="settings-panel__edit-accept-icon"
        icon={faCheck}
        onClick={handleAcceptSettings}
      />
      <form
        className="settings-panel__settings-wrapper"
        onSubmit={e => {
          e.preventDefault();
          handleAcceptSettings();
        }}>
        <FontAwesomeIcon
          className="settings-panel__edit-text-icon"
          icon={faAlignLeft}
          onClick={handleEditTextButton}
        />
        <input
          style={
            categoryTitleStatus
              ? { opacity: 1, height: "30px", width: "85%" }
              : {}
          }
          type="text"
          className="settings-panel__text-input"
          onChange={e => setTitleCategory(e.target.value)}
          value={titleCategory}
          placeholder={name ? name : "Nazwa kategorii"}
        />
        <div className="settings-panel__image-wrapper">
          <FontAwesomeIcon
            className="settings-panel__switch-img-icon"
            icon={faImage}
            style={
              isImageWrapperOpen && {
                transform: "scale(.95)",
                color: "rgba(50, 50, 50, 0.15)"
              }
            }
            onClick={() => setIsImageWrapperOpen(state => !state)}
          />
          <div
            className="settings-panel__upload-wrapper"
            style={{
              opacity: isImageWrapperOpen && 1,
              transform: isImageWrapperOpen && "scale(1)"
            }}>
            <input
              type="file"
              className="settings-panel__file-input"
              accept="image/*"
              onChange={e => {
                setFileInput(e.target.files[0]);
              }}
            />
            <FontAwesomeIcon
              className="settings-panel__upload-img-icon"
              icon={faCloudUploadAlt}
              style={{
                color:
                  fileInput !== "" && !isRemoveImage && "rgba(0, 255, 0, .5)"
              }}
            />
          </div>
          <span
            className="settings-panel__remove-img-icon"
            onClick={() => {
              setIsRemoveImage(state => !state);
            }}
            style={{
              opacity: isImageWrapperOpen && 1,
              transform: isImageWrapperOpen && "scale(1)",
              color: isRemoveImage && "rgba(255, 0, 0, .5)"
            }}>
            <FontAwesomeIcon
              icon={faBan}
              style={{ display: !image && "none" }}
            />
          </span>
        </div>
      </form>
    </div>
  );
}

export default SettingsPanel;

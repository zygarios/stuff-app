import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faImage,
  faCheck,
  faBan,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import "../Sass/SettingsPanel.scss";
import axios from "axios";

function SettingsPanel({
  empty,
  image,
  category_id,
  statusChanger,
  getCardsData,
  name = ""
}) {
  const [categoryTitleStatus, setCategoryTitleStatus] = useState(false);
  const [isImageWrapperOpen, setIsImageWrapperOpen] = useState(false);
  const [isRemoveImageOn, setIsRemoveImageOn] = useState(false);
  const [titleCategory, setTitleCategory] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState(name);
  const [fileInput, setFileInput] = useState("");
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

  const newCategory = () => {
    if (titleCategory.length === 0) {
      setCategoryTitleStatus(true);
      setInputPlaceholder("Musisz podać nazwę");
    } else if (titleCategory.length < 3) {
      setInputPlaceholder("Za krótka nazwa");
      setTitleCategory("");
      return;
    } else if (titleCategory.length > 10) {
      setInputPlaceholder("Za długa nazwa");
      setTitleCategory("");
      return;
    } else if (fileInput.size > 2100000) {
      setCategoryTitleStatus(true);
      setInputPlaceholder("Za duże zdjęcie");
      setTitleCategory("");
      return;
    }

    const formDataCategory = new FormData();

    formDataCategory.set("name", titleCategory);
    formDataCategory.set("image", fileInput);

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
        statusChanger(null, "home");
        getCardsData();
      })
      .catch(err => console.log(err));
  };
  const updateCategory = () => {
    if (!titleCategory && !fileInput) {
      return;
    }
    if (titleCategory.length > 0 && titleCategory.length < 3) {
      setInputPlaceholder("Za krótka nazwa");
      setTitleCategory("");
      return;
    } else if (titleCategory.length > 10) {
      setInputPlaceholder("Za długa nazwa");
      setTitleCategory("");
      return;
    } else if (fileInput.size > 2100000) {
      setCategoryTitleStatus(true);
      setInputPlaceholder("Za duże zdjęcie");
      setTitleCategory("");
      return;
    }

    const formDataCategory = new FormData();

    titleCategory
      ? formDataCategory.set("name", titleCategory)
      : formDataCategory.set("name", name);

    fileInput && formDataCategory.set("image", fileInput);
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
        statusChanger(null, "home");
        getCardsData();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="settings-panel">
      <FontAwesomeIcon
        className="settings-panel__edit-accept-icon"
        icon={faCheck}
        onClick={handleAcceptSettings}
      />
      <form action="" className="settings-panel__settings-wrapper">
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
          placeholder={inputPlaceholder ? inputPlaceholder : "Nazwa kategorii"}
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
              onChange={e => setFileInput(e.target.files[0])}
            />
            <FontAwesomeIcon
              className="settings-panel__upload-img-icon"
              icon={faCloudUploadAlt}
            />
          </div>
          <span
            className="settings-panel__remove-img-icon"
            onClick={() => {
              setFileInput("delete");
            }}
            style={{
              opacity: isImageWrapperOpen && 1,
              transform: isImageWrapperOpen && "scale(1)"
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

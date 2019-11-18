import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faImages,
  faCheck,
  faBan
} from "@fortawesome/free-solid-svg-icons";
import "../Sass/SettingsPanel.scss";
import axios from "axios";

function SettingsPanel({
  empty,
  category_id,
  statusChanger,
  getCardsData,
  name = ""
}) {
  const [categoryTitleStatus, setCategoryTitleStatus] = useState(false);
  const [titleCategory, setTitleCategory] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState(name);
  const [fileInput, setFileInput] = useState("");
  const [isRemoveImage, setIsRemoveImage] = useState(false);

  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

  const handleEditTextButton = () => {
    setCategoryTitleStatus(state => !state);
  };
  const handleAcceptSettings = () => {
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
    if (empty) {
      newCategory();
    } else {
      updateCategory();
    }
  };

  const newCategory = () => {
    const formDataCategory = new FormData();

    formDataCategory.set("name", titleCategory);
    formDataCategory.append("image", fileInput);

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
    const formDataCategory = new FormData();

    formDataCategory.set("name", titleCategory);
    formDataCategory.append("_method", "put");

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
        <FontAwesomeIcon
          className="settings-panel__upload-img-icon"
          icon={faImages}
        />
        <div className="settings-panel__upload-wrapper">
          <input
            type="file"
            className="settings-panel__file-input"
            accept="image/*"
            onChange={e => setFileInput(e.target.files[0])}
          />
          <FontAwesomeIcon
            className="settings-panel__upload-img-icon"
            icon={faImages}
          />
        </div>
        <FontAwesomeIcon
          className="settings-panel__remove-img-icon"
          icon={faBan}
        />
      </form>
    </div>
  );
}

export default SettingsPanel;

import React, { useState, useEffect } from "react";
import "../Sass/SitePopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashAlt,
  faShare
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function SitePopUp({
  category_id,
  popUpActiveType,
  getGroupsData,
  getSitesData,
  setPopUpActiveType,
  siteIdActive,
  groupIdActive,
  site
}) {
  let siteNameState = "";
  let URLValueState = "";
  let important = false;
  if (popUpActiveType === "site") {
    siteNameState = site.name;
    URLValueState = site.url;
    important = Boolean(Number(site.important));
  }

  const [siteName, setSiteName] = useState(siteNameState);
  const [URLValue, setURLValue] = useState(URLValueState);
  const [importantStatus, setImportantStatus] = useState(important);
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteAlertStatus, setDeleteAlertStatus] = useState(false);
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";
  const newSite = formDataSite => {
    const serverSiteURL = `${serverCategoriesURL}/${category_id}/groups/${groupIdActive}/sites`;
    const token = localStorage.getItem("access_token");
    axios
      .post(serverSiteURL, formDataSite, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  const updateSite = formDataSite => {
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
        setPopUpActiveType(false);
        getGroupsData(category_id);
        getSitesData();
      })
      .catch(err => console.log(err));
  };

  const deleteSite = () => {
    if (!deleteAlertStatus) return;

    const serverSiteURL = `${serverCategoriesURL}/${category_id}/groups/${groupIdActive}/sites/${siteIdActive}`;
    const token = localStorage.getItem("access_token");

    axios
      .delete(serverSiteURL, {
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
      deleteSite();
      setDeleteAlertStatus(false);
      return;
    }

    if (siteName.length === 0) {
      return setAlertMessage("Podaj nazwę strony");
    } else if (URLValue.length === 0) {
      return setAlertMessage("Podaj adres URL");
    } else if (siteName.length < 3) {
      return setAlertMessage("Za krótka nazwa strony");
    } else if (URLValue.length <= 3) {
      return setAlertMessage("Za krótki adres URL");
    } else if (siteName.length > 30) {
      return setAlertMessage("Za długa nazwa");
    } else if (!URLValue.includes(".")) {
      return setAlertMessage("Podaj prawidłowy adres URL");
    }

    const formDataSite = new FormData();

    formDataSite.set("name", siteName);
    formDataSite.append("url", URLValue);
    formDataSite.append("important", Number(importantStatus));

    if (popUpActiveType === "empty-site") {
      newSite(formDataSite);
    } else if (popUpActiveType === "site") {
      formDataSite.append("_method", "put");
      updateSite(formDataSite);
    }
  };

  const keyDownSubmitForm = e => {
    if (e.keyCode === 13) {
      editTypeChanger();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownSubmitForm);
    return () => window.removeEventListener("keydown", keyDownSubmitForm);
  });
  return (
    <div className="site-pop-up">
      <form
        className="site-pop-up__form"
        onSubmit={e => {
          e.preventDefault();
        }}>
        {!deleteAlertStatus && (
          <>
            <label
              htmlFor="site-name"
              className="site-pop-up__name"
              disabled={deleteAlertStatus && true}
              style={{ opacity: deleteAlertStatus && 0.5 }}>
              Nazwa strony:
              <input
                autoFocus
                id="site-name"
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                className="site-pop-up__name-input"
                placeholder="Wprowadź nazwę"
                disabled={deleteAlertStatus && true}
                style={{ opacity: deleteAlertStatus && 0.5 }}
              />
            </label>
            <label
              htmlFor="url-name"
              className="site-pop-up__url"
              disabled={deleteAlertStatus && true}
              style={{ opacity: deleteAlertStatus && 0.5 }}>
              Adres URL:
              <input
                id="url-name"
                type="url"
                value={URLValue}
                onChange={e => setURLValue(e.target.value)}
                className="site-pop-up__url-input"
                placeholder="Wprowadź adres url"
                disabled={deleteAlertStatus && true}
                style={{ opacity: deleteAlertStatus && 0.5 }}
              />
            </label>
            <label
              htmlFor="important"
              className="site-pop-up__important"
              disabled={deleteAlertStatus && true}
              style={{ opacity: deleteAlertStatus && 0.5 }}>
              Ważne
              <input
                id="important"
                type="checkbox"
                checked={importantStatus}
                onChange={e => setImportantStatus(state => !state)}
                className="site-pop-up__important-checkbox"
                placeholder="Wprowadź adres url"
                disabled={deleteAlertStatus && true}
                style={{ opacity: deleteAlertStatus && 0.5 }}
              />
            </label>
          </>
        )}
        {alertMessage && (
          <span
            className="site-pop-up__alert"
            style={{ opacity: 1, transform: "scaleY(1)" }}>
            {alertMessage}
          </span>
        )}
        <span className="site-pop-up__icons-wrapper">
          <span className="site-pop-up__accept-icon" onClick={editTypeChanger}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {popUpActiveType === "site" && (
            <span
              className="site-pop-up__delete-icon"
              onClick={() => {
                deleteAlertStatus
                  ? setAlertMessage("")
                  : setAlertMessage("Na pewno chcesz usunąć stronę?");
                setDeleteAlertStatus(state => !state);
              }}>
              <FontAwesomeIcon
                icon={!deleteAlertStatus ? faTrashAlt : faShare}
              />
            </span>
          )}
        </span>
      </form>
    </div>
  );
}

export default SitePopUp;

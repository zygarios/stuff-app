import React, { useState, useEffect } from "react";
import "../Sass/SitePopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function SitePopUp({
  category_id,
  popUpActiveType,
  getGroupsData,
  getSitesData,
  setPopUpActiveType,
  siteIdActive,
  groupIdActive
}) {
  const [siteName, setSiteName] = useState("");
  const [URLValue, setURLValue] = useState("");
  const [importantStatus, setImportantStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteAlertStatus, setDeleteAlertStatus] = useState(false);
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";

  const newSite = () => {
    const formDataSite = new FormData();

    formDataSite.set("name", siteName);
    formDataSite.set("url", URLValue);
    formDataSite.set("notes", "");
    formDataSite.set("important", importantStatus);

    const serverSiteURL = `${serverCategoriesURL}/${category_id}/groups/${groupIdActive}/sites`;
    const token = localStorage.getItem("access_token");
    axios
      .post(serverSiteURL, formDataSite, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: "Bearer" + token
        }
      })
      .then(res => {
        console.log(res.data);
        setPopUpActiveType(false);
        getGroupsData(category_id);
        getSitesData();
      })
      .catch(err => console.log(err));
  };

  const updateSite = () => {
    const formDataSite = new FormData();
    formDataSite.set("name", siteName);
    formDataSite.set("_method", "put");

    const serverSiteURL = `${serverCategoriesURL}/${category_id}/groups/${groupIdActive}/sites/${siteIdActive}`;
    const token = localStorage.getItem("access_token");

    axios
      .post(serverSiteURL, formDataSite, {
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

  // const deleteSite = () => {
  //   if (!deleteAlertStatus) return;

  //   const serverSiteURL = `${serverCategoriesURL}/${category_id}/groups/${
  //     popUpActiveType.group_id
  //   }`;
  //   const token = localStorage.getItem("access_token");

  //   axios
  //     .delete(serverSiteURL, {
  //       headers: {
  //         Authorization: "Bearer " + token
  //       }
  //     })
  //     .then(res => {
  //       setPopUpActiveType(false);
  //       getGroupsData(category_id);
  //       getSitesData();
  //     })
  //     .catch(err => console.log(err));
  // };
  console.log(popUpActiveType, groupIdActive);
  const editTypeChanger = () => {
    // if (deleteAlertStatus) {
    //   deleteSite();
    //   setDeleteAlertStatus(false);
    // }

    if (popUpActiveType === "empty-site") {
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
      newSite();
    } else if (popUpActiveType === "site") {
      if (!siteName && !URLValue && !importantStatus) {
        return setAlertMessage("Brak zmian");
      } else {
        if (siteName.length) {
          if (siteName.length < 3) {
            return setAlertMessage("Za krótka nazwa strony");
          } else if (siteName.length > 30) {
            return setAlertMessage("Za długa nazwa");
          }
        }
        if (URLValue.length) {
          if (URLValue.length <= 3) {
            return setAlertMessage("Za krótki adres URL");
          } else if (!URLValue.includes(".")) {
            return setAlertMessage("Podaj prawidłowy adres URL");
          }
        }
        updateSite();
      }
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
        }}
      >
        <label htmlFor="site-name" className="site-pop-up__name">
          Nazwa strony:
          <input
            autoFocus
            id="site-name"
            type="text"
            value={siteName}
            onChange={e => setSiteName(e.target.value)}
            className="site-pop-up__name-input"
            placeholder="Wprowadź nazwę"
          />
        </label>
        <label htmlFor="url-name" className="site-pop-up__url">
          Adres URL:
          <input
            id="url-name"
            type="url"
            value={URLValue}
            onChange={e => setURLValue(e.target.value)}
            className="site-pop-up__url-input"
            placeholder="Wprowadź adres url"
          />
        </label>
        <label htmlFor="important" className="site-pop-up__important">
          Ważne
          <input
            id="important"
            type="checkbox"
            checked={importantStatus}
            onChange={e => setImportantStatus(e.target.checked)}
            className="site-pop-up__important-checkbox"
            placeholder="Wprowadź adres url"
          />
        </label>
        {alertMessage && (
          <span
            className="site-pop-up__alert"
            style={{ opacity: 1, transform: "scaleY(1)" }}
          >
            {alertMessage}
          </span>
        )}
        <span className="site-pop-up__icons-wrapper">
          <span className="site-pop-up__accept-icon" onClick={editTypeChanger}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {popUpActiveType.group_id && (
            <span
              style={{
                color: deleteAlertStatus && "rgba(255, 0, 0, .5)"
              }}
              className="site-pop-up__delete-icon"
              onClick={() => {
                setDeleteAlertStatus(state => !state);
                setAlertMessage("Na pewno chcesz usunąć stronę?");
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

export default SitePopUp;

import React, { useState } from "react";
import "../Sass/SitePopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function SitePopUp({ data }) {
  const [siteName, setSiteName] = useState("");
  const [URLValue, setURLValue] = useState("");

  return (
    <div className="site-pop-up">
      <form className="site-pop-up__form">
        <label htmlFor="site-name" className="site-pop-up__name">
          Nazwa strony:
          <input
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
            type="text"
            value={URLValue}
            onChange={e => setURLValue(e.target.value)}
            className="site-pop-up__url-input"
            placeholder="Wprowadź adres url"
          />
        </label>
        <span className="site-pop-up__accept-icon">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </form>
    </div>
  );
}

export default SitePopUp;

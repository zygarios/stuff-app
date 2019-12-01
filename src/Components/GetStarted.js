import React from "react";
import "../Sass/GetStarted.scss";
import gif1 from "../../public/img/Gif-1.gif";

function GetStarted() {
  return (
    <div className="get-started">
      <div className="get-started__step">
        <div className="get-started__gif">
          <img src={gif1} alt="Step 1" />
        </div>
        <h3 className="get-started__title">1. Twórz kategorie</h3>
      </div>
      <div className="get-started__step">
        <div className="get-started__gif">
          <img src={gif1} alt="Step 2" />
        </div>

        <h3 className="get-started__title">2. Twórz grupy</h3>
      </div>
      <div className="get-started__step">
        <div className="get-started__gif">
          <img src={gif1} alt="Step 3" />
        </div>
        <h3 className="get-started__title">3. Dodawaj strony</h3>
      </div>
    </div>
  );
}

export default GetStarted;

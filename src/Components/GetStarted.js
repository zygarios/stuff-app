import React from "react";
import "../Sass/GetStarted.scss";
import gif1 from "../../public/img/Gif-1.gif";
import gif2 from "../../public/img/Gif-2.gif";

function GetStarted() {
  return (
    <div className="get-started">
      <h1 className="get-started__about">
        Organizer ulubionych stron internetowych
      </h1>
      <div className="get-started__step">
        <h3 className="get-started__title get-started__title--first">
          1. Zakładaj karty z kategoriami
        </h3>
        <div className="get-started__gif get-started__gif--first">
          <img src={gif1} alt="Step 1" />
        </div>
      </div>
      <div className="get-started__step">
        <h3 className="get-started__title get-started__title--second">
          2. Personalizuj grupy, strony i notatki
        </h3>
        <div className="get-started__gif get-started__gif--second">
          <img src={gif2} alt="Step 2" />
        </div>
      </div>
    </div>
  );
}

export default GetStarted;

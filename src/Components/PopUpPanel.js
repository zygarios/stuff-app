import React from "react";
import "../Sass/PopUpPanel.scss";

function PopUpPanel({ siteNote }) {
  return (
    <div className="pop-up-panel">
      <div className="pop-up-panel__container">{siteNote}</div>
    </div>
  );
}

export default PopUpPanel;

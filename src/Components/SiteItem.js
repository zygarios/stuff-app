import React from "react";
import "../Sass/SiteItem.scss";

function SiteItem() {
  return (
    <div className="site">
      <img
        className="site__favicon"
        src="http://www.google.com/s2/favicons?domain=wwwp.wp.pl"
        alt="favicon-website"
      />
      <h3 className="site__name">cos</h3>
      <p className="site__update-time" />
      <button className="site__go-on-website">
        <a
          className="site__link"
          href="http://www.google.com/s2/favicons?domain=wwwp.wp.pl">
          cos
        </a>
      </button>
    </div>
  );
}

export default SiteItem;

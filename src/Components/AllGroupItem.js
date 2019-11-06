import React from "react";

function AllGroupItem({ getSitesData }) {
  return (
    <li
      onClick={() => getSitesData(id)}
      className={`group-item ${true && "active-select"}`}
    >
      Wszystkie strony
    </li>
  );
}

export default AllGroupItem;

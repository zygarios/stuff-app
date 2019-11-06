import React, { useState, useEffect } from "react";
import "../Sass/HomePanel.scss";
import Navbar from "./Navbar";
import CardItem from "./CardItem";
import axios from "axios";
import EmptyCard from "./EmptyCard";

function HomePanel(props) {
  const serverCategoriesURL = "https://jimmyspage.pl/api/categories";
  const [cardsData, setCardsData] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  // localStorage.removeItem("access_token");
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token === null) {
      props.history.push("/login");
    }
    axios
      .get(serverCategoriesURL, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        const sites = res.data;
        const cardsList = sites.map(card => ({
          activeId: card.id,
          activeBookmark: false,
          activeSettings: false
        }));
        setCardsData(sites);
        cardsList.unshift({
          activeId: 0,
          activeSettings: false,
          activeBookmark: false
        });
        setActiveStatus(cardsList);
      })
      .catch(err => console.log(err));
  }, []);

  const handleBodyClick = e => {
    e.target.classList.contains("home-panel__cards-container") &&
      statusChanger(null, "home");
  };

  const activeObjectFiller = (activeId, bookmark, settings) => {
    return {
      activeId: activeId,
      activeBookmark: bookmark,
      activeSettings: settings
    };
  };

  const statusChanger = (id, type) => {
    const activeUpdate = activeStatus.map(card => {
      switch (type) {
        case "bookmark":
          if (id === card.activeId) {
            return activeObjectFiller(card.activeId, true, false);
          } else {
            return activeObjectFiller(card.activeId, false, false);
          }
        case "settings":
          if (id === card.activeId) {
            return activeObjectFiller(card.activeId, false, true);
          } else {
            return activeObjectFiller(card.activeId, false, false);
          }
        case "home":
          return activeObjectFiller(card.activeId, false, false);
        default:
          return card;
      }
    });
    setActiveStatus(activeUpdate);
  };
  const cards = cardsData.map(card => {
    const { id, name, image, created_at, updated_at } = card;
    const index = activeStatus.findIndex(item => item.activeId === id);
    return (
      <CardItem
        key={id}
        id={id}
        name={name}
        statusChanger={statusChanger}
        activeStatus={activeStatus[index]}
        image={image}
        created_at={created_at}
        updated_at={updated_at}
      />
    );
  });
  return (
    <main className="home-panel" onClick={handleBodyClick}>
      <Navbar />
      <ul className="home-panel__cards-container">
        <EmptyCard
          statusChanger={statusChanger}
          activeStatus={activeStatus[0]}
        />
        {cards}
      </ul>
    </main>
  );
}

export default HomePanel;

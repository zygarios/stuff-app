import React, { useState, useEffect } from "react";
import "../Sass/HomePanel.scss";
import Navbar from "./Navbar";
import Card from "./Card";

const panelsApi = [
  {
    category_id: 3,
    created_at: "2019-08-03 14:25:20",
    updated_at: "2019-08-03 14:25:20",
    name: "Jewell",
    bookmarks: [
      {
        bookmark_id: "1a",
        notes: "Vege",
        created_at: "2019-08-03 14:25:20",
        updated_at: "2019-08-03 14:25:20",
        thumbnail: ""
      },
      {
        bookmark_id: "2b",
        notes: "Curry",
        created_at: "2019-08-03 14:25:20",
        updated_at: "2019-08-03 14:25:20",
        thumbnail: ""
      },
      {
        bookmark_id: "3c",
        notes: "Przepisy",
        created_at: "2019-08-03 14:25:20",
        updated_at: "2019-08-03 14:25:20",
        thumbnail: ""
      }
    ],
    status_id: 3,
    thumbnail: "storage/app/public/photosd2496b9bca79370d35886974d389917f.jpg",
    url: "https://www.gutmann.com/illo-ipsa-suscipit-numquam-inventore-quia",
    user_id: 2
  }
];

const panels = [
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" },
  { category_id: 123, category: "Jedzonko", created_at: "" }
];

// const useMoveActiveCardTop = element => {
//   const activeElement = document.querySelector(element);
//   console.log(activeElement.getBoundingClientRect().top);
//   // useEffect(() => {});
// };

function HomePanel() {
  const [cardsData, setCardsData] = useState([]);
  const [cardsSettingStatus, setCardsSettingStatus] = useState([]);
  const [cardsBookmarkStatus, setCardsBookmarkStatus] = useState([]);

  useEffect(() => {
    setCardsData(panels);
    let cardsList = panels.map(card => false);
    setCardsSettingStatus(cardsList);
    setCardsBookmarkStatus(cardsList);
  }, []);

  const statusChanger = (id, type) => {
    if (type === "settings") {
      const settings = cardsSettingStatus.map((card, index) => {
        if (index === id) {
          return !card;
        } else {
          return false;
        }
      });
      const bookmarkDisable = cardsBookmarkStatus.map(card => (card = false));
      setCardsBookmarkStatus(bookmarkDisable);
      setCardsSettingStatus(settings);
    } else if (type === "bookmark") {
      const bookmark = cardsBookmarkStatus.map((card, index) => {
        if (index === id) {
          return !card;
        } else {
          return false;
        }
      });
      const settingsDisable = cardsSettingStatus.map(card => (card = false));
      setCardsBookmarkStatus(bookmark);
      setCardsSettingStatus(settingsDisable);
    } else if (type === "home") {
      const resetCardsBookmarkStatus = cardsBookmarkStatus.map(item => false);
      const resetCardsSettingStatus = cardsSettingStatus.map(item => false);
      setCardsBookmarkStatus(resetCardsBookmarkStatus);
      setCardsSettingStatus(resetCardsSettingStatus);
    }
  };

  const cards = cardsData.map((card, cardIndex) => {
    return (
      <Card
        key={cardIndex}
        id={cardIndex}
        statusChanger={statusChanger}
        activeSettings={cardsSettingStatus[cardIndex]}
        activeBookmark={cardsBookmarkStatus[cardIndex]}
      />
    );
  });

  return (
    <main className="home-panel">
      <Navbar />
      <ul className="home-panel__cards-container">{cards}</ul>
    </main>
  );
}

export default HomePanel;

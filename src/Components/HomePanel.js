import React from "react";
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
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 },
  { name: 8 },
  { name: 9 },
  { name: 10 },
  { name: 11 },
  { name: 12 },
  { name: 13 },
  { name: 14 },
  { name: 15 },
  { name: 16 },
  { name: 17 },
  { name: 18 },
  { name: 19 },
  { name: 20 }
];

function HomePanel() {
  const cards = panels.map((card, index) => {
    return <Card name={card.name} key={index} />;
  });
  cards.unshift(<Card empty={true} key="11j2jk32j" />);

  return (
    <main className="home-panel">
      <Navbar />
      <ul className="home-panel__cards-container">{cards}</ul>
    </main>
  );
}

export default HomePanel;

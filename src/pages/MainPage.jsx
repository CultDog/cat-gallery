import React from "react";
import "./MainPage.css";
import CatList from "../components/CatList";
import ThemeTogle from "../components/ThemeTogle";

function MainPage() {
  return (
    <div className="main-page">
      <ThemeTogle />
      <CatList />
    </div>
  );
}

export default MainPage;

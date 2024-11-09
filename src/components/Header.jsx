import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setBreed,
  setCategory,
  clearCats,
  fetchCats,
  fetchBreeds,
  fetchCategories,
} from "../features/catSlice";
import CustomSelect from "./CustomSelector";
import "./Header.css";

function Header({ onExit }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.cats.breeds);
  const categories = useSelector((state) => state.cats.categories);

  const [isVisible, setIsVisible] = useState(true);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    dispatch(fetchBreeds());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleBreedChange = (e) => {
    dispatch(setBreed(e.target.value));
    dispatch(clearCats());
    dispatch(fetchCats());
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
    dispatch(clearCats());
    dispatch(fetchCats());
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    if (startY - currentY > 50) {
      setIsVisible(false);
    } else if (currentY - startY > 50) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [startY]);

  return (
    <header className={`header ${isVisible ? "visible" : "hidden"}`}>
      <div className="header-container">
        <div className="logo-container">
          <h1>Cat Gallery</h1>
        </div>
        <div className="filters-section">
          <CustomSelect
            options={breeds}
            onChange={handleBreedChange}
            placeholder="Выберите породу"
          />
          <CustomSelect
            options={categories}
            onChange={handleCategoryChange}
            placeholder="Выберите категорию"
          />
        </div>
        <nav className="navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
          >
            About
          </Link>
          <button onClick={onExit} className="exit-button">
            Выход
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

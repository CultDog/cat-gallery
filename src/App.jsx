import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import { fetchBreeds, fetchCategories } from "./features/catSlice";
import ConfirmExitModal from "./components/ConfirmExitModal";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  useEffect(() => {
    dispatch(fetchBreeds());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleExit = () => {
    window.close();
    setShowConfirmExit(false);
  };

  const handleCancelExit = () => {
    setShowConfirmExit(false);
  };

  const handleShowConfirmExit = () => {
    setShowConfirmExit(true);
  };

  return (
    <div className="App">
      <Header onExit={handleShowConfirmExit} />
      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
      {showConfirmExit && (
        <ConfirmExitModal onConfirm={handleExit} onCancel={handleCancelExit} />
      )}
    </div>
  );
}

export default App;

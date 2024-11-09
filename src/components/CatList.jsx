import React, { useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCats,
  incrementPage,
  fetchCatDetails,
  clearCatDetails,
} from "../features/catSlice";
import SkeletonCard from "./SkeletonCard";
import Loader from "./Loader";
import "./CatList.css";

function CatList() {
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.cats.cats);
  const status = useSelector((state) => state.cats.status);
  const error = useSelector((state) => state.cats.error);
  const page = useSelector((state) => state.cats.page);
  const hasMore = useSelector((state) => state.cats.hasMore);
  const noResults = useSelector((state) => state.cats.noResults);
  const catDetails = useSelector((state) => state.cats.catDetails);
  const loadingDetails = useSelector((state) => state.cats.loadingDetails);
  const observer = useRef();
  const [selectedCat, setSelectedCat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const lastCatRef = useCallback(
    (node) => {
      if (status === "loading" || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(incrementPage());
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, dispatch, hasMore]
  );

  useEffect(() => {
    dispatch(fetchCats());
  }, [dispatch, page]);

  const handleCardClick = (cat) => {
    setSelectedCat(cat);
    setShowModal(true);
    dispatch(fetchCatDetails(cat.id));
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(clearCatDetails());
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  return (
    <div>
      {status === "loading" && page === 1 && (
        <div className="cat-list">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {status === "failed" && <p>Error: {error}</p>}

      {noResults && (
        <div className="no-results">
          <p>Нет данных по выбранным фильтрам.</p>
        </div>
      )}

      <div className="cat-list">
        {cats.map((cat, index) => {
          return (
            <div
              className="cat-card"
              key={cat.id}
              ref={cats.length === index + 1 ? lastCatRef : null}
              onClick={() => handleCardClick(cat)}
            >
              <img src={cat.url} alt="A cute cat" />
              {cat.breeds?.length > 0 ? (
                <p>Порода: {cat.breeds[0].name}</p>
              ) : (
                <p>Пока нет данных о породе</p>
              )}
              {cat.categories?.length > 0 ? (
                <p>Категория: {cat.categories[0].name}</p>
              ) : (
                <p>Пока нет данных о категории</p>
              )}
            </div>
          );
        })}
      </div>

      {status === "loading" && page > 1 && hasMore && (
        <div className="cat-list">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {showModal && selectedCat && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>
            <img src={selectedCat.url} alt="A cute cat" />
            {loadingDetails ? (
              <Loader />
            ) : (
              catDetails && (
                <div>
                  <h3>Детали о коте</h3>
                  {catDetails.breeds && catDetails.breeds.length > 0 && (
                    <div>
                      <p>
                        <strong>Порода:</strong> {catDetails.breeds[0].name}
                      </p>
                      <p>
                        <strong>Темперамент:</strong>{" "}
                        {catDetails.breeds[0].temperament}
                      </p>
                      <p>
                        <strong>Происхождение:</strong>{" "}
                        {catDetails.breeds[0].origin}
                      </p>
                      <p>
                        <strong>Вес:</strong>{" "}
                        {catDetails.breeds[0].weight.metric} кг
                      </p>
                      <p>
                        <strong>Продолжительность жизни:</strong>{" "}
                        {catDetails.breeds[0].life_span} лет
                      </p>
                      {catDetails.breeds[0].wikipedia_url && (
                        <p>
                          <strong>Подробнее:</strong>{" "}
                          <a
                            href={catDetails.breeds[0].wikipedia_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Википедия
                          </a>
                        </p>
                      )}
                    </div>
                  )}
                  <p>ID изображения: {catDetails.id}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CatList;

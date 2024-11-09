import React from "react";
import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
    </div>
  );
}

export default SkeletonCard;
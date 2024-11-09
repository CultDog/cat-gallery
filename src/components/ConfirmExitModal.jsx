import React from "react";
import "./ConfirmExitModal.css";

function ConfirmExitModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onCancel}>
          ✖
        </button>{" "}
        <h3>Вы уверены, что хотите выйти?</h3>
        <button className="btn-yes" onClick={onConfirm}>
          Да
        </button>
        <button className="btn-no" onClick={onCancel}>
          Нет
        </button>
      </div>
    </div>
  );
}

export default ConfirmExitModal;

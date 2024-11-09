import React, { useState, useEffect, useRef } from "react";
import "./CustomSelector.css";

function CustomSelector({ options, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const selectRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.name);

    const event = {
      target: {
        value: option.id,
      },
    };
    onChange(event);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || placeholder}
        <span className="arrow">&#9662;</span> {}
      </div>
      {isOpen && (
        <div className="options">
          <div
            className="option"
            onClick={() => handleOptionClick({ name: "", id: "" })}
          >
            Сбросить выбор
          </div>
          {options.map((option) => (
            <div
              key={option.id}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelector;

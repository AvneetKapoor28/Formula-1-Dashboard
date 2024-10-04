import React, { useState, useEffect, useContext } from "react";
import "./DropdownYear.css";
import { PastSeasonsPageContext } from "../../Context/PastSeasonsPageProvider";

const DropdownYear = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedYear, setselectedYear } = useContext(PastSeasonsPageContext);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const previousYear = new Date().getFullYear() - 1;
    //to create years Array from 1950 to current year
    const years = Array.from(
      { length: previousYear - 1950 + 1 },
      (_, index) => 1950 + index
    );
    years.reverse();
    setOptions(years);
  }, []);

  const toggleDropdownYear = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setselectedYear(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdownYear">
      <div
        className={`dropdownYear-header ${isOpen ? "open" : ""}`}
        onClick={toggleDropdownYear}
      >
        {selectedYear || new Date().getFullYear() - 1}
        <span className="dropdownYear-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && options.length > 0 && (
        <ul className="dropdownYear-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdownYear-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownYear;

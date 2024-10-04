import React from "react";
import "./RaceItem.css";

const RaceItem = (props) => {
  return (
    <div className="raceitem">
      <div className="date-roundnumber">
        <div className="date-range">10 Dec - 12 Dec</div>
        <div className="round-number">{props.Round}</div>
      </div>

      <div className="race-name">{props.RaceName}</div>
      <div className="race-details">
        <div className="circuit-name">{props.CircuitName}</div>
        <div className="location-info">
          <div className="locality-name">{props.Locality + ","}</div>
          <div className="country-name">{props.Country}</div>
        </div>
      </div>
    </div>
  );
};

export default RaceItem;

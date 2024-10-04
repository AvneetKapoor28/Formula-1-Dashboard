import React from "react";
import "./DriverStandingItem.css";

const DriverStandingItem = (props) => {
  return (
    <div className="standings-item-container">
      <div className="driver-standing-item">
        <div className="driver-position">{props.Position}</div>
        <div className="driver-number">{props.Number}</div>
        <div className="driver-name">{props.Name}</div>
        <div className="contructor-name">{props.constructorName}</div>
        <div className="driver-points">{props.Points}</div>
        <div className="driver-wins">{props.Wins}</div>
      </div>
    </div>
  );
};

export default DriverStandingItem;

import React from "react";
import "./ConstructorStandingItem.css";

const ConstructorStandingItem = (props) => {
  return (
    <div className="standings-item-container">
      <div className="constructor-standing-item">
        <div className="constructor-position">{props.Position}</div>
        <div className="constructor-name">{props.constructorName}</div>
        <div className="constructor-points">{props.Points}</div>
        <div className="constructor-wins">{props.Wins}</div>
      </div>
    </div>
  );
};

export default ConstructorStandingItem;

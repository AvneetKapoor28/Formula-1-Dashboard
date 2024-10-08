import "./ConstructorStandingTable.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PastSeasonsPageContext } from "../../Context/PastSeasonsPageProvider";
import ConstructorStandingItem from "../ConstructorStandingItem/ConstructorStandingItem";
import loading_animation from "../../Assets/loading_animation.webm";

const ConstructorStandingTable = () => {
  const { selectedYear } = useContext(PastSeasonsPageContext);
  const [loading, setLoading] = useState(true); // Loading state
  const [constructorStandingsList, setConstructorStandingsList] = useState([]); // Driver standings state

  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/pastData/constructorStandings/${
          selectedYear || new Date().getFullYear() - 1
        }`
      )
      .then((response) => {
        setConstructorStandingsList(response.data); // Update driver standings
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.log(error);
        setConstructorStandingsList([]); // Clear Constructor standings on error
        setLoading(false); // Stop loading on error
      });
  }, [selectedYear]);
  // Loading animation
  if (loading) {
    return (
      <div className="loading-container">
        <video autoPlay loop muted className="video-player">
          <source src={loading_animation} type="video/webm" />
          {/* Your browser does not support the video tag. */}
        </video>
      </div>
    );
  } else {
    return (
      <div className="heading-and-items">
        <div className="constructor-standing-header position-heading">
          <div className="constructor-standing-header-item">Position</div>
          <div className="constructor-standing-header-item constructor-heading-constructor-table">
            Constructor
          </div>
          <div className="constructor-standing-header-item points-heading-constructor-table">
            Points
          </div>
          <div className="constructor-standing-header-item wins-heading-constructor-table">
            Wins
          </div>
        </div>
        <div className="standings-container">
          {constructorStandingsList.length > 0 ? (
            constructorStandingsList.map((constructor, index) => (
              <ConstructorStandingItem
                key={index}
                Position={constructor.position}
                constructorName={constructor.Constructor.name}
                Points={constructor.points}
                Wins={constructor.wins}
              />
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    );
  }
};

export default ConstructorStandingTable;

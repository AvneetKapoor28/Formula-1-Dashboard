import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./SeasonRaceCount.css";
import { PastSeasonsPageContext } from "../../Context/PastSeasonsPageProvider";

const SeasonRaceCount = () => {
  const [raceCount, setRaceCount] = useState(null);
  const { selectedYear } = useContext(PastSeasonsPageContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5500/pastData/races/${selectedYear}/count`)
      .then((response) => {
        setRaceCount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setRaceCount(null);
        setLoading(false);
      });
  }, [selectedYear]);
  return (
    <div className="widget">
      <h3 className="widget-title">Race Count</h3>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="count race-count">{raceCount || "No data available"}</div>
      )}
    </div>
  );
};

export default SeasonRaceCount;

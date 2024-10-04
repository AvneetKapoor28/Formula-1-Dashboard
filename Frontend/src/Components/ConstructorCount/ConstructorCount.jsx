import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./ConstructorCount.css";
import { PastSeasonsPageContext } from "../../Context/PastSeasonsPageProvider";

const ConstructorCount = () => {
  const [constructorCount, setConstructorCount] = useState(null);
  const { selectedYear } = useContext(PastSeasonsPageContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5500/pastData/constructorstandings/${selectedYear}/count`
      )
      .then((response) => {
        setConstructorCount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setConstructorCount(null);
        setLoading(false);
      });
  }, [selectedYear]);
  return (
    <div className="widget">
      <h3 className="widget-title">Constructor Count</h3>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="count constructor-count">
          {constructorCount || "No data available"}
        </div>
      )}
    </div>
  );
};

export default ConstructorCount;

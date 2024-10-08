import React, { useState, useContext, useEffect } from "react";
import "./DriverCount.css";
import { PastSeasonsPageContext } from "../../Context/PastSeasonsPageProvider";
import axios from "axios";

const DriverCount = () => {
  const [driverCount, setDriverCount] = useState(null);
  const { selectedYear } = useContext(PastSeasonsPageContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/pastData/driverstandings/${selectedYear}/count`
      )
      .then((response) => {
        setDriverCount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setDriverCount(null);
        setLoading(false);
      });
  }, [selectedYear]);

  return (
    <div className="widget">
      <h3 className="widget-title">Driver Count</h3>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="count driver-count">{driverCount || "No data available"}</div>
      )}
    </div>
  );
};

export default DriverCount;

import React, { useContext, useEffect, useState } from "react";
import "./RaceItemList.css";
import { PastSeasonsPageContext } from "../../Context/PastSeasonsPageProvider";
import loading_animation from "../../Assets/loading_animation.webm";
import axios from "axios";
import RaceItem from "../RaceItem/RaceItem";

const RaceItemList = () => {
  const { selectedYear } = useContext(PastSeasonsPageContext);
  const [raceList, setRaceList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get(`http://localhost:5500/pastData/races/${selectedYear}`)
      .then((response) => {
        setRaceList(response.data); // Update racelist
        setLoading(false); // Stop loading
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setRaceList([]); // Clear racelist on error
        setLoading(false); // Stop loading on error
      });
  }, [selectedYear]);
  if (loading) {
    return (
      <div className="loading-container">
        <video autoPlay loop muted className="video-player">
          <source src={loading_animation} type="video/webm" />
        </video>
      </div>
    );
  } else {
    return (
      <>
        <div className="race-items-container-heading">Races</div>
        <div className="race-items-container">
          {raceList.length > 0 ? (
            (console.log(raceList),
            raceList.map((round, index) => {
              return (
                <RaceItem
                  key={index}
                  Round={round.round}
                  RaceName={round.raceName}
                  CircuitName={round.Circuit.circuitName}
                  Locality={round.Circuit.Location.locality}
                  Country={round.Circuit.Location.country}
                  Date={round.date}
                />
              );
            }))
          ) : (
            <p>No Data Available</p>
          )}
        </div>
      </>
    );
  }
};

export default RaceItemList;

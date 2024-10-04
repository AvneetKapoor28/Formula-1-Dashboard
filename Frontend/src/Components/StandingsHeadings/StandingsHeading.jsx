import React, { useContext } from "react";
import "./StandingsHeading.css";
import DriverStandingTable from "../DriverStandingTable/DriverStandingTable";
import { PastSeasonsPageContext } from "../../Context/PastSeasonsPageProvider";
import ConstructorStandingTable from "../ConstructorStandingTable/ConstructorStandingTable";
const Standings = () => {
  const { standings, setStandings } = useContext(PastSeasonsPageContext);
  return (
    <div>
      <span className="standings-heading-span">
        <h2 className="standings-heading">Standings</h2>
      </span>
      <div className="driversOrConstructors">
        <h3
          onClick={() => {
            setStandings("Drivers");
          }}
          className={standings === "Drivers" ? "selected" : ""}
        >
          Drivers
        </h3>{" "}
        <span>|</span>
        <h3
          onClick={() => {
            setStandings("Constructors");
          }}
          className={standings === "Constructors" ? "selected" : ""}
        >
          Constructors
        </h3>
      </div>
      {/* RENDERING THE TABLE BASED ON THE SELECTION */}
      {standings === "Drivers" ? (
        <DriverStandingTable />
      ) : (
        <ConstructorStandingTable />
      )}
    </div>
  );
};

export default Standings;

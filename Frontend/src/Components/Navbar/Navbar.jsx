import React from "react";
import "./Navbar.css";
import logo from "../../Assets/Logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navSelection, setNavSelection] = useState("HomePage");
  return (
    <div className="Navbar">
      <div className="website-logo">
        <Link to={"/"} onClick={() => setNavSelection("LandingPage")}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="links">
        <p
          onClick={() => setNavSelection("LiveRaceData")}
          className={navSelection === "LiveRaceData" ? "selected" : ""}
        >
          <span className="spanforlink">
            <Link to={"/liverace"} className="link">
              Live Race Data
            </Link>
          </span>
        </p>
        <p
          onClick={() => setNavSelection("CurrentSeason")}
          className={navSelection === "CurrentSeason" ? "selected" : ""}
        >
          <Link to={"/currentseason"} className="link">
            Current Season
          </Link>
        </p>
        <p
          onClick={() => setNavSelection("PastSeasons")}
          className={navSelection === "PastSeasons" ? "selected" : ""}
        >
          <Link to={"pastseasons"} className="link">
            Past Seasons
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;

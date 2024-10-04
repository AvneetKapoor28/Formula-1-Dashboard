import React from "react";
import "./Css/PastSeasonsPage.css";
import StandingsHeading from "../Components/StandingsHeadings/StandingsHeading";
import DropdownYear from "../Components/DropdownYear/DropdownYear";
import { PastSeasonsPageContextProvider } from "../Context/PastSeasonsPageProvider";
import SeasonRaceCount from "../Components/SeasonRaceCount/SeasonRaceCount";
import DriverCount from "../Components/DriverCount/DriverCount";
import ConstructorCount from "../Components/ConstructorCount/ConstructorCount";
import RaceItem from "../Components/RaceItem/RaceItem";
import RaceItemList from "../Components/RaceItemList/RaceItemList";

const PastSeasonsPage = () => {
  return (
    <div>
      <PastSeasonsPageContextProvider>
        <div className="standingsheading-selectyear">
          <div>
            <StandingsHeading />
          </div>

          <div className="right-side">
            <DropdownYear />
            <div className="counts-container">
              <DriverCount />
              <ConstructorCount />
              <SeasonRaceCount />
            </div>
          </div>
        </div>

        <div>
          {/* <RaceItem /> */}
          <RaceItemList/>
        </div>
      </PastSeasonsPageContextProvider>
    </div>
  );
};

export default PastSeasonsPage;

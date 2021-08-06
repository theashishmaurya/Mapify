import { createContext, useContext, useState } from "react";
import React from "react";

export const RoadmapContext = createContext();

function RoadmapData(props) {
  const [roadmapData, setRoadmapData] = useState("This is data");
  return (
    <RoadmapContext.Provider value={[roadmapData, setRoadmapData]}>
      {props.children}
    </RoadmapContext.Provider>
  );
}
export default RoadmapData;

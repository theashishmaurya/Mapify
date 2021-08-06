import { createContext, useContext, useState } from "react";
import React from "react";

export const RoadmapContext = createContext();

function RoadmapData(props) {
  const [roadmapData, setRoadmapData] = useState({
    data: "Data",
    background: "#fff",
    edgeType: "default",
  });
  return (
    <RoadmapContext.Provider value={[roadmapData, setRoadmapData]}>
      {props.children}
    </RoadmapContext.Provider>
  );
}
export default RoadmapData;

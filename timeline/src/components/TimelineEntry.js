import React from "react";

const TimelineEntry = ({ isOdd }) => {
  const matchData = {
    ratingAtStart: 1227,
    result: "win",
    endTime: "56416516",
    against: "hikaru",
  };

  return (
    <div
      className={isOdd ? "timeline-container-odd" : "timeline-container-even"}
    >
      <div className="timeline-content">
        <h2>{matchData.result.toUpperCase()}</h2>
        <div>vs. {matchData.against}</div>
      </div>
      <div className="timeline-image">
        <div className="timeline-vertical-line"></div>
        <i className="fas fa-plus timeline-icon positive"></i>
        {/* <i className="fas fa-minus timeline-icon negative"></i>
        <i class="fas fa-equals timeline-icon draw"></i> */}
      </div>
    </div>
  );
};

export default TimelineEntry;

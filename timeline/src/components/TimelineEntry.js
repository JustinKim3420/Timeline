import React from "react";

const TimelineEntry = ({ matchData, isOdd }) => {
  const dateOptions = {
    day: "2-digit",
    year: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const matchDate = new Date(matchData.endTime * 1000);
  const icon =
    matchData.result === "win" ? (
      <i className="fas fa-plus timeline-icon positive"></i>
    ) : matchData.result === "loss" ? (
      <i className="fas fa-minus timeline-icon negative"></i>
    ) : (
      <i className="fas fa-equals timeline-icon draw"></i>
    );

  return (
    <div
      className={isOdd ? "timeline-container-odd" : "timeline-container-even"}
    >
      <div className="content-bubble">
        <div className="timeline-content">
          <h2 id="match-result">
            {matchData.result.toUpperCase()}{" "}
            <span>({matchData.ratingAtStart})</span>
            <span id="rating">{matchData.changeInRating}</span>
          </h2>
          <div id="against">
            vs. {matchData.against.username} ({matchData.against.rating})
          </div>

          <div id="end-time">
            {matchDate.toLocaleDateString("en-US", dateOptions)}
          </div>
        </div>
        <div className="carrot"> </div>
      </div>
      <div className="timeline-image">
        <div className="timeline-vertical-line"></div>
        {icon}
      </div>
    </div>
  );
};

export default TimelineEntry;

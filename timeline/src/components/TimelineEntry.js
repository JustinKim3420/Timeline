import React from "react";

const TimelineEntry = () => {
  return (
    <div className="timeline-container">
      <div className="timeline-image">
        <div className="timeline-vertical-line"></div>
        <i className="fas fa-plus timeline-icon positive"></i>
        {/* <i className="fas fa-minus timeline-icon negative"></i>
        <i class="fas fa-equals timeline-icon draw"></i> */}
      </div>
      <div className="timeline-content"></div>
    </div>
  );
};

export default TimelineEntry;

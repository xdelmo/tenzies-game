import React from "react";

export default function Scoreboard(props) {
  return (
    <div className="Scoreboard">
      <div className="stats-container">
        <div className="rolls-best">
          <p>Best rolls</p>
          <p className="gradient-text">{props.bestRolls}</p>
        </div>
        <div className="time-best">
          <p>Best time</p>
          {/* Convert milliseconds in seconds */}
          <p className="gradient-text">{props.bestTime / 100}s</p>
        </div>
      </div>
    </div>
  );
}

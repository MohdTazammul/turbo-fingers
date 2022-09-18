import React from "react";
import { Icon } from "@iconify/react";

import "./style.scss";
function StatsCard({ minutes, seconds, accuracy, speed }) {
  return (
    <div id="StatsCard">
      <div>
        <Icon className="icon" icon="fluent:timer-12-filled" color="#5bccf6" />
        <span id="timer">
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      </div>
      <div className="separator"><span></span></div>
      <div>
        <Icon
          className="icon"
          icon="material-symbols:speed-rounded"
          color="#5bccf6"
        />
        <span id="speed">{isNaN(speed) ? 0 : speed}</span>
      </div>
      <div className="separator"><span></span></div>
      <div>
        <Icon className="icon" icon="mingcute:aiming-2-fill" color="#5bccf6" />
        <span id="accuracy">{accuracy}%</span>
      </div>
    </div>
  );
}

export default StatsCard;

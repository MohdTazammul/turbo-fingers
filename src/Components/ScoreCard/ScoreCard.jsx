import React from 'react'
import "./style.scss"
import GaugeChart from "react-gauge-chart";
function ScoreCard({speed, accuracy, totalTime, seconds, minutes, paragraph, freqOfWrongChars}) {
    console.log(freqOfWrongChars)
  return (
    <div id='ScoreCard'>
        <div>
            <GaugeChart style={{ height: "150px"}}
            id="gauge-chart"
            textColor="white"
            nrOfLevels={3}
            arcsLength={[0.4, 0.6, 1]}
            colors={["#EA4228", "#F5CD19","#5BE12C" ]}
            percent={speed/100}
            arcPadding={0.02}
            animate={true}
            text
        />
        </div>
        <div>
            <div>Speed {speed}</div>
            <div>accuracy {accuracy}</div>
            <div>time {totalTime}</div>
            {/* <div>wrongChars {wrongChars}</div> */}
            {/* <div>freqOfWrongChars ${JSON.stringify(freqOfWrongChars)}</div> */}
        </div>
    </div>
  )
}

export default ScoreCard
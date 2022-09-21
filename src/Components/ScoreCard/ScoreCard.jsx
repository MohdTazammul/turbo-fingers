import React, { useState } from 'react'
import "./style.scss"
import GaugeChart from "react-gauge-chart";
function ScoreCard({speed, accuracy, totalTime, seconds, minutes, paragraph, freqOfWrongChars}) {
  var words = paragraph.join("").split(" ").length;
  var characters = paragraph.length;
    var mistakes = 0
    for(var key in freqOfWrongChars)
    {
      mistakes+=freqOfWrongChars[key];
    }
   
  return (
    
    <div id='ScoreCard'>
      <div className='top-cont'>
      {/* <h1>Tests can be improved</h1> */}
      </div>
        <div className='middle-cont'>
            <div>
              <GaugeChart style={{width:"100%"}}
                    id="gauge-chart"
                    textColor="black"
                    nrOfLevels={4}
                    arcsLength={[0.4, 0.4, 0.5, 0.7]}
                    colors={["#EA4228", "#F5CD19","#5BE12C", "#2d6e16"]}
                    percent={speed/100}
                    arcPadding={0.02}
                    needleColor={"grey"}
                    formatTextValue	={(speed)=>speed+" w/pm"}
                    needleBaseColor={"black"}
                    animate={true}
                    text
                />
            </div>
            <div className='card-cont'>
              <div className='card'>
                <div>Time</div>
                <div>
                  <div className='time'></div>
                  <div>{minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}</div>
                </div>
              </div>
              <div className='card'>
                <div>Accuracy</div>
                  <div>
                    <div className='accuracy'></div>
                    <div>{accuracy}<span style={{fontSize:"20px"}}>(%)</span></div>
                  </div>
              </div>
              <div className='card'>
                <div>Speed</div>
                  <div>
                    <div className='speed'></div>
                    <div>{speed}<span style={{fontSize:"20px"}}>(wpm)</span></div>
                  </div>
              </div>
              <div className='card'>
                <div>Words</div>
                  <div>
                    <div className='words'></div>
                    <div>{words}</div>
                  </div>
              </div>
              <div className='card'>
                <div>Characters</div>
                  <div>
                    <div className='chars'></div>
                    <div>{characters}</div>
                  </div>
              </div>
              <div className='card'>
                <div>Mistakes</div>
                  <div>
                    <div className='wrong-entries'></div>
                    <div>{mistakes}</div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ScoreCard
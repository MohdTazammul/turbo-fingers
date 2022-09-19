import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import StatsCard from "../../Components/StatsCard/StatsCard";
import SpeedLoader from "../../utills/SpeedLoader";
import ScoreCard from "../../Components/ScoreCard/ScoreCard";
import getContent from "../../Content/paragraphs";


var wrongChars = {};
var numberOfCharsTyped = 0;
function TypingTest() {
  const navigate = useNavigate();
  var content = useRef([]);
  var [timerFlag, setTimerFlag] = useState(false);
  var [timer, setTimer] = useState(0);
  var [minutes, setMinutes] = useState(0);
  var [seconds, setSeconds] = useState(0);
  var [speed, setSpeed] = useState(0);
  var [accuracy, setAccuracy] = useState(0);
  const [scorePage, setScorePage] = useState(false);
  const [loader, setLoader] = useState(false);
  let data = getContent();
  const [text, setText] = useState(data[1].split(""));
  const [heading, setHeading] = useState(data[0]);
 

  var wrongSumbissions = 0;
  useEffect(() => {
    var currentIndex = 0;
    content.current[0].classList.add("current");
    window.addEventListener("keypress", (e) => {
      console.log(text)
      numberOfCharsTyped = currentIndex;
      if (currentIndex == 0) {
        setTimerFlag(true);
        setAccuracy(100);
      }
      console.log(text[currentIndex], e.key);
      if (text[currentIndex] == e.key) {
        content.current[currentIndex].classList.remove("error");
        content.current[currentIndex].classList.remove("current");
        content.current[currentIndex].classList.add("correct");
        currentIndex++;
        if (currentIndex >= text.length) {
          setTimerFlag(false);
          setLoader(true);
          setTimeout(() => {
            setScorePage(true);
          }, 1000);
        } else content.current[currentIndex].classList.add("current");
      } else {
        wrongChars[text[currentIndex]] = wrongChars[text[currentIndex]]
          ? wrongChars[text[currentIndex]] + 1
          : 1;
        content.current[currentIndex].classList.remove("current");
        content.current[currentIndex].classList.add("error");
        wrongSumbissions++;
        let first = text.length - wrongSumbissions;
        let second = text.length;
        setAccuracy(((first / second) * 100).toFixed(2));
      }
    });
  }, []);

  useEffect(() => {
    var timerInterval;
    if (timerFlag) {
      timerInterval = setInterval(() => {
        if (numberOfCharsTyped >= text.length - 1) {
          clearInterval(timerInterval);
        } else {
          setTimer((pre) => pre + 1);
          setSeconds((pre) => pre + 1);
        }
      }, 1000);
    }
  }, [timerFlag]);
  useEffect(() => {
    var WPM = ((numberOfCharsTyped / Math.floor(timer)) * (60 / 5)).toFixed(0);
    setSpeed(WPM);
  }, [timer]);
  useEffect(() => {
    if (seconds == 60) {
      setSeconds(0);
      setMinutes((pre) => pre + 1);
    }
  }, [seconds]);
  return (
    <div id="main-container">
      {!loader ? (
        <div id="content-cont">
          <StatsCard
            minutes={minutes}
            speed={speed}
            accuracy={accuracy}
            seconds={seconds}
          />
          <div id="content">
            <h2>{heading}</h2>
            {text.map((el, i) => {
              return (
                <span ref={(el) => { content.current[i] = el; }} key={i} >
                  {el}
                </span>
              );
            })}
            <div className="retake-test-btn">
              <button onClick={()=>window.location.reload()}>Retake Test</button>
            </div>
          </div>
        </div>
      ) : !scorePage ? (
        <div id={"loader-cont"}>
          <SpeedLoader />
        </div>
      ) : (
        <div>
          <ScoreCard
            speed={speed}
            accuracy={accuracy}
            totalTime={seconds}
            seconds={seconds}
            minutes={minutes}
            paragraph={text}
            freqOfWrongChars={wrongChars}
          />
        </div>
      )}
      <div></div>
    </div>
  );
}

export default TypingTest;

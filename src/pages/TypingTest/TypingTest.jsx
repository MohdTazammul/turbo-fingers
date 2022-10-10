import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../../Redux/action";
import API from "../../utills/API"
import "./style.scss";
import StatsCard from "../../Components/StatsCard/StatsCard";
import SpeedLoader from "../../utills/SpeedLoader";
import ScoreCard from "../../Components/ScoreCard/ScoreCard";
import getContent from "../../Content/paragraphs";
import {signInWithPopup, auth, provider} from '../../Firebase/config';
import GoogleIcon from '@mui/icons-material/Google';
import LoadingButton from '@mui/lab/LoadingButton';


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
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);
  const [userID, setUserID] = useState(false);
 
  const dispatch = useDispatch();

  const storeData = useSelector((state) => state)
    useEffect(()=>{
        if(storeData.isLogin)
        {
            setLoggedIn(true);
            setUserID(storeData.data._id);
        }
        else
            setLoggedIn(false);
    }, [storeData])

  const RetakeTest = () =>
  {
    window.location.reload();
  }

    const onRegister =() =>
    {
        setLoginLoader(true);
        signInWithPopup(auth, provider).then(resp=>
          {
                    var obj = {name:resp.user.displayName, email:resp.user.email, image:resp.user.photoURL, authProvider:"Google"};
                    fetch(`${API}/user`, {
                        method:"POST",
                        headers:{'Content-Type': 'application/json'},
                        body : JSON.stringify(obj)
                    }).then(resp=>resp.json()).then(resp=>{
                        if(!resp.error)
                        {
                            setUserID(resp.data._id)
                            setLoginLoader(false);
                            setLoggedIn(true);
                            dispatch(storeToken({token:resp.token, data:resp.data}));
                        }
                    })
                }).catch(e=>{
                    alert(e.message);
                })
                .finally(()=>{
                    setLoginLoader(false);
                })
    }

  var wrongSumbissions = 0;
  useEffect(() => {
    var currentIndex = 0;
    content.current[0].classList.add("current");
    window.addEventListener("keypress", (e) => 
    {
      numberOfCharsTyped = currentIndex;
      if (currentIndex == 0) {
        setTimerFlag(true);
        setAccuracy(100);
      }
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
      } else 
      {
       if(text[currentIndex])
       {
        wrongChars[text[currentIndex]] = wrongChars[text[currentIndex]]
        ? wrongChars[text[currentIndex]] + 1
        : 1;
       }
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
              <button onClick={RetakeTest}>Retake Test</button>
            </div>
          </div>
        </div>
      ) : !scorePage ? (
        <div id={"loader-cont"}>
          <SpeedLoader />
        </div>
      ) :
      loggedIn?
      <div>
          <ScoreCard
            speed={speed}
            accuracy={accuracy}
            totalTime={seconds}
            seconds={seconds}
            minutes={minutes}
            paragraph={text}
            heading={heading}
            userID={userID}
            freqOfWrongChars={wrongChars}
            wrong={wrongSumbissions}
            RetakeTest
          />
        </div>
        :
        <div className="login-modal">
            <div> 
              <h2>Please sign in to see your typing test result</h2>
            <div>
              <LoadingButton style={{padding:"10px", width:"100%", fontSize:"1.1vw"}}
                    size="small" 
                    onClick={onRegister}
                    startIcon={<GoogleIcon style={{backgroundColor:"white", padding:"1px", color:"#1876D1", borderRadius:"5px"}} />}
                    loading={loginLoader}
                    loadingPosition="start"
                    variant="contained">
                    Sign in With Google
                </LoadingButton>
              </div>
              <div>
                <h3>Benefits of signing in</h3>
                <ul>
                  <li>Keep track of your typing speed and accuracy.</li>
                  <li>Detailed Typing Test result.</li>
                  <li>Your rank will be shown on the leaderboard.</li>
                </ul>
              </div>
              <button onClick={RetakeTest}>&#10060;</button>
          </div>
        </div>
      }
      <div></div>
    </div>
  );
}

export default TypingTest;

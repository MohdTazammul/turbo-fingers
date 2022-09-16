import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../utills/Button';
import "./style.scss"
function Home() {
    const navigate = useNavigate();
  return (
    <div className='Home-Page'>
        <div id='banner-img'></div>
        <div id='middle-cont'>
            <div>
                <h1>Turbo Typing Test</h1>
                <p>
                You can test your typing speed in wpm with some other details i.e. Accuracy, Wrong entries, etc. and impress your friends or employers with your own typing certificate. Test your typing speed, and find out how fast you type, and then improve your typing speed if necessary.
                </p>
                <Button value={"Take typing test"} redirect={"/Typing-Test"} />
            </div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default Home
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer';
import Button from '../../utills/Button';
import "./style.scss"
function Home() {
    const navigate = useNavigate();
  return (
    <>
    <div className='Home-Page'>
        <div id='banner-img'></div>
        <div id='middle-cont'>
            <div>
                <h1>Turbo Typing Test</h1>
                <p>
                You can test your typing speed in WPM with some other details i.e. accuracy, wrong entries, gross speed, net speed, etc. And impress your friends or employers with your higher rank on trubo fingers leaderboard. Test your typing speed, and find out how fast you type, and then improve your typing speed accordingly.
                </p>
                <Button value={"Take typing test"} redirect={"/Typing-Test"} />
            </div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Home
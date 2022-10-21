import React from 'react'
import { useNavigate } from 'react-router-dom'
import FadeInSection from '../../utills/FadeInSection';
import Footer from '../../Components/Footer/Footer';
import Button from '../../utills/Button';
import "./style.scss"
function Home() {
    const navigate = useNavigate();
  return (
    <>
    <div className='Home-Page'>
        <div id='banner-img'></div>
        <FadeInSection>
        <div id='middle-cont'>
            <div>
                <h1>Turbo Fingers Test</h1>
                <p className='desktop'>
                You can test your typing speed in WPM with some other details i.e. accuracy, wrong entries, gross speed, net speed, etc. And impress your friends or employers with your higher rank on trubo fingers leaderboard. Test your typing speed, and find out how fast you type, and then improve your typing speed accordingly.
                </p>
                <p className='mobile'>Unfortunately you can't use Turbo Fingers Typing Test on your mobile phone. To attempt typing test please use the desktop.</p>
                <div className='desktop'>
                <Button value={"Take typing test"} redirect={"/Typing-Test"} />
                </div>
                
            </div>
            <div className='desktop'>
                <div></div>
            </div>
        </div>
        </FadeInSection>
    </div>
    <Footer />
    </>
  )
}

export default Home
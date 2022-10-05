import React, {useState, useEffect} from 'react'
import "./style.scss"
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import ProfileGraph from '../../Components/ProfileGraph/ProfileGraph';
import Footer from '../../Components/Footer/Footer';
function Profile() {
  
    const [userID, setUserID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate();
  const storeData = useSelector((state) => state)
    useEffect(()=>{
        if(storeData.isLogin)
        {
            console.log(storeData)
            setUserID(storeData.data._id);
            setEmail(storeData.data.email);
            setName(storeData.data.name)
            setImage(storeData.data.image)
        }
        else
        {
            navigate("/")
        }
    }, [storeData])
  
    return (
    
    <>
    <div id='Profile-page'>
        <h1>Profile Page</h1>
        <hr />
        <div className='upper-cont'>
            <div style={{backgroundImage:`url(${image})`}}></div>
            <div>
                <h2>{name}</h2>
                <h4>{email}</h4>
            </div>
        </div>

        <hr />
        <div className='profile-graph'>
            <ProfileGraph userID={userID} />
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Profile
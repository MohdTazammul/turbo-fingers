import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {signInWithPopup, auth, provider} from '../../Firebase/config';
import GoogleIcon from '@mui/icons-material/Google';
import LoadingButton from '@mui/lab/LoadingButton';
import API from "../../utills/API";
import "./style.scss"
import { useEffect } from 'react';
function Navbar() {
    var [loader, setLoader] = useState(false); 
    const [loggedIn, setLoggedIn] = useState(false);
    const [userImage, setUserImage] = useState("https://www.w3schools.com/howto/img_avatar.png")
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    useEffect(()=>{
        let token = localStorage.getItem("token");
    if(token)
    {
        fetch(`${API}/user/${token}`).then(resp=>resp.json())
        .then(data=>{
            if(!data.error)
            {
                setLoggedIn(true)
                // console.log(data)
                setUserImage(data.image)
            }
        })
    }
    }, [])

    const onRegister =() =>
    {
        setLoader(true);
        signInWithPopup(auth, provider).then(resp=>{
                    // console.log(resp)
                    var obj = {name:resp.user.displayName, email:resp.user.email, image:resp.user.photoURL, authProvider:"Google"};
                    // console.log(obj)
                    fetch(`${API}/user`, {
                        method:"POST",
                        headers:{'Content-Type': 'application/json'},
                        body : JSON.stringify(obj)
                    }).then(resp=>resp.json()).then(resp=>{
                        // console.log(resp)
                        if(!resp.error)
                        {
                            setLoggedIn(true);
                            setUserImage(obj.image)
                            localStorage.setItem("token", resp.token)
                        }
                    })
                }).catch(e=>{
                    alert(e.message);
                })
                .finally(()=>{
                    setLoader(false);
                })
    }

  return (
    <div id='Navbar'>
        <div id='logo'>
            <div onClick={()=>navigate("/")} style={{backgroundImage:`url(https://user-images.githubusercontent.com/90475607/190911726-c8c34c46-0f54-4368-8da3-eaa50f093fa0.png)`}}></div>
        </div>
        <div>
            <button onClick={()=>navigate("/")}>Home</button>
            <button onClick={()=>navigate("/Typing-Test")}>Typing Test</button>
            <button>Leaderboard</button>
        </div>
        <div>
            {loggedIn?
            <div>
                <div onClick={()=>setShowMenu(pre=>!pre)} style={{backgroundImage:`url(${userImage})`}}></div>
                {showMenu?
                <div className='menu'>
                    <h3>Profile</h3>
                    <h3 onClick={()=>{
                        localStorage.removeItem("token");
                        setLoggedIn(false)
                    }}>Logout</h3>
                </div>:""}
            </div>
            :
            <LoadingButton style={{height:"70%"}}
                size="small" 
                onClick={onRegister}
                startIcon={<GoogleIcon style={{backgroundColor:"white", padding:"1px", color:"#1876D1", borderRadius:"5px"}} />}
                loading={loader}
                loadingPosition="start"
                variant="contained">
                Sign in With Google
            </LoadingButton>
            }
        </div>
    </div>
  )
}

export default Navbar
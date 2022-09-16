import React from 'react'
import "./style.scss";
import {signInWithGoogle} from "../../Firebase/config"
import { useState } from 'react';
import {signInWithPopup, auth, provider} from '../../Firebase/config';
import GoogleIcon from '@mui/icons-material/Google';
import LoadingButton from '@mui/lab/LoadingButton';
function Register() {
    var [loader, setLoader] = useState(false);
    var onRegister =() =>
    {
        setLoader(true);
        signInWithPopup(auth, provider).then(resp=>{
            console.log(resp)
                    var obj = {name:resp.user.displayName, email:resp.user.email, profile:resp.user.photoURL};
                    let email = obj.email.replace(/[^a-zA-Z0-9 ]/g, '');
                console.log(obj);
                }).catch(e=>{
                    console.log(e.message);
                })
                .finally(()=>{
                    setLoader(false);
                })
    }
  return (
   <div style={{width:"50%", margin:"auto", marginTop:"30%"}}>
    <LoadingButton
          size="small"
          onClick={onRegister}
          startIcon={<GoogleIcon style={{backgroundColor:"white", padding:"1px", color:"#1876D1"}} />}
          loading={loader}
          loadingPosition="start"
          variant="contained">
          Sign in With Google
        </LoadingButton>
   </div>
  )
}

export default Register
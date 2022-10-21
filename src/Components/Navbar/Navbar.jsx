import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, auth, provider } from "../../Firebase/config";
import GoogleIcon from "@mui/icons-material/Google";
import LoadingButton from "@mui/lab/LoadingButton";
import {useSelector, useDispatch} from "react-redux";
import { logout, storeToken } from "../../Redux/action";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import FeedbackIcon from '@mui/icons-material/Feedback';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';

import API from "../../utills/API";
import "./style.scss";
import { useEffect } from "react";
function Navbar() {
  var [loader, setLoader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const storeData = useSelector((state) => state)
    useEffect(()=>{
        if(storeData.isLogin)
        {
            setLoggedIn(true);
            setUserImage(storeData.data.image);
        }
        else
        {
            setLoggedIn(false);
        }
    }, [storeData])

  const onRegister = () => {
    setLoader(true);
    signInWithPopup(auth, provider)
      .then((resp) => {
        var obj = {
          name: resp.user.displayName,
          email: resp.user.email,
          image: resp.user.photoURL,
          authProvider: "Google",
        };
        fetch(`${API}/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        })
          .then((resp) => resp.json())
          .then((resp) => {
            if (!resp.error) 
            {
              dispatch(storeToken({token:resp.token, data:resp.data}));
            }
          });
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div id="Navbar">
      <div id="logo">
        <div
          onClick={() => navigate("/")}
          style={{
            backgroundImage: `url(https://user-images.githubusercontent.com/90475607/190911726-c8c34c46-0f54-4368-8da3-eaa50f093fa0.png)`,
          }}
        ></div>
      </div>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button className="desktop" onClick={() => navigate("/Typing-Test")}>Typing Test</button>
        <button onClick={() => navigate("/Leaderboard")}>Leaderboard</button>
      </div>
      <div className="desktop">
        {loggedIn ? (
          <div>
            <div
              onClick={handleClick}
              style={{ backgroundImage: `url(${userImage})` }}
            ></div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 20,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={()=>navigate("/profile")}>
                <Avatar fontSize="small" /> Profile
              </MenuItem>
              <MenuItem onClick={()=>{
                dispatch(logout());
              }}>
                <ListItemIcon>
                  <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
              </MenuItem>
              <Divider />
              <MenuItem onClick={()=>{
                window
                .open("https://forms.gle/LcFuqnDdNaJ19rzk9", "_blank")
                .focus()
              }}>
                <ListItemIcon>
                  <FeedbackIcon fontSize="medium" />
                </ListItemIcon>
                Feedback Form
              </MenuItem>
              <MenuItem onClick={()=>{
                window
                .open("https://github.com/MohdTazammul/turbo-fingers", "_blank")
                .focus()
              }}>
                <ListItemIcon>
                  <GitHubIcon fontSize="medium" />
                </ListItemIcon>
                Source Code
              </MenuItem>
              
            </Menu>
          </div>
        ) : (
          <LoadingButton
            style={{ height: "70%" }}
            size="small"
            onClick={onRegister}
            startIcon={
              <GoogleIcon
                style={{
                  backgroundColor: "white",
                  padding: "1px",
                  color: "#1876D1",
                  borderRadius: "5px",
                }}
              />
            }
            loading={loader}
            loadingPosition="start"
            variant="contained"
          >
            Sign in With Google
          </LoadingButton>
        )}
      </div>
    </div>
  );
}

export default Navbar;

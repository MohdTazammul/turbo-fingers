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
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";

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

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     fetch(`${API}/user/${token}`)
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         if (!data.error) {
  //           setLoggedIn(true);
  //           setUserImage(data.image);
  //         }
  //       });
  //   }
  // }, []);


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
        // console.log(resp)
        var obj = {
          name: resp.user.displayName,
          email: resp.user.email,
          image: resp.user.photoURL,
          authProvider: "Google",
        };
        // console.log(obj)
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
        <button onClick={() => navigate("/Typing-Test")}>Typing Test</button>
        <button onClick={() => navigate("/Leaderboard")}>Leaderboard</button>
      </div>
      <div>
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
                // elevation: 0,
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
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={()=>{
                dispatch(logout());
              }}>
                <ListItemIcon>
                  <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
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

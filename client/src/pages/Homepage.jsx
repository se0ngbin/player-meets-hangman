import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import BellIcon from '../assets/bell_icon.png';
import UserIcon from '../assets/user_icon.png';
import "./Homepage.css"
import Girl1 from '../assets/girl1.jpeg';
import Guy from '../assets/guy.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrossIcon from '../assets/cross_icon.png';
import HeartIcon from '../assets/heart_icon.png';
import Popup from 'reactjs-popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import UserList from './userList.json'

//const userList = require('./userList');


const Homepage = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const [currProfile, setCurrProfile] = useState(UserList[0]);

    const fetchFeed = async () => {
        try {
            const response = await fetch("http://localhost:3001/profile/random", {
                method: "GET",
            });
            if (response.ok) {
                console.log("profile get successfully");
                const data = await response.json();
                console.log(data);
            } else {
                console.log("didn't work.");
                console.log(response.status);
            }
            return response.ok;
        } catch (err) {
            console.error("GET random profile ", err);
            return err.status;
        }
    }

    useEffect(() => {
        fetchFeed();
    }, []);

    const handleLike = () => {
        setCurrProfile(UserList[currIndex+1]);
        setCurrIndex(currIndex + 1);
    }

    const handleDislike = () => {
        setCurrProfile(UserList[currIndex + 1]);
        setCurrIndex(currIndex + 1);
    }
    
    return (
        <div>
            <div className="navbar">
                <img src={Logo} alt="" height="30" className="logo"></img>
                <Popup
                    trigger={
                        <img src={BellIcon} alt="" height="25" className="bellIcon"></img>
                    }
                    position='bottom right'
                    closeOnDocumentClick
                >
                    <div className="notification">
                        <div className="notifTitle">Notifications</div>
                        <div className="menu1">
                            <div className="menu-item1">
                                You matched with Alexandra! Play hangman with her!
                            </div>
                            <div className="menu-item1">
                                You matched with Bella! Play hangman with her!
                            </div>
                            <div className="menu-item1">
                                You matched with Cassandra! Play hangman with her!
                            </div>
                            <div className="menu-item1 last-item">
                                You matched with Dory! Play hangman with her!
                            </div>
                        </div>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src={UserIcon} alt="" height="25" className="userIcon"></img>
                    }
                    position='bottom right'
                    closeOnDocumentClick
                >
                    <div className="profilePopup">
                        <div className="selfPic">
                            <img src={Guy} alt="" height="100%"/>
                        </div>
                        <div className="selfInfo1">David Holmwood (23)</div>
                        <div className="selfInfo2">San Francisco, California</div>
                        <div className="menu2">
                            <div className="menu-item2">Past Matches</div>
                            <div className="menu-item2 last-item">Log Out</div>
                        </div>
                    </div>
                </Popup>
                
            </div>
            <div className="body">
                <div className="behindLayer1">
            </div>
                <div className="card">
                    <img src={Girl1} alt="" className="userPhoto"  />
                    <div className="buttons dislikeButton" onClick={handleDislike}>
                        <img src={CrossIcon} alt="" height="40%" className="icons"></img>
                    </div>
                    <div className="buttons likeButton" onClick={handleLike}>
                        <img src={HeartIcon} alt="" height="50%" className="icons"></img>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="title">{currProfile.userName}, {currProfile.userAge}</div>
                    <div className="subtitle">{currProfile.userCity}, {currProfile.userState}</div>
                </div>
            </div>
        </div>
    );
}
export default Homepage;
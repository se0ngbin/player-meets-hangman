import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import BellIcon from '../assets/bell_icon.png';
import UserIcon from '../assets/user_icon.png';
import "./Homepage.css"
import Girl1 from '../assets/girl1.jpeg';
import Girl2 from '../assets/girl2.jpeg';
import Girl3 from '../assets/girl3.jpeg';
import Girl4 from '../assets/girl4.jpeg';
import Girl5 from '../assets/girl5.jpeg';
import Girl6 from '../assets/girl6.jpeg';
import Girl7 from '../assets/girl7.jpeg';
import Guy from '../assets/guy.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrossIcon from '../assets/cross_icon.png';
import HeartIcon from '../assets/heart_icon.png';
import Popup from 'reactjs-popup';
import HangmanIcon from '../assets/hangman_game.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const userList = require('./userList');

const feedPhotos = [
    Girl1,
    Girl2,
    Girl3,
    Girl4,
    Girl5,
    Girl6,
    Girl7,
];

const Homepage = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const [currProfile, setCurrProfile] = useState(userList[0]);
    const [currPhoto, setCurrPhoto] = useState(feedPhotos[0]);
    const [endOfFeed, setEndOfFeed] = useState(false);
    const [popupShow, setPopupShow] = useState(false);
    const [matchedUser, setMatchedUser] = useState({});

    // TODO: test whether the fetching data function works
    // once data returned, replace the static variables beneath

    const fetchFeed = async () => {

        // Trying to GET random profile. Worked before now it doesn't work :(
        // but GET requests worked when I tried to get "/genders" or "/interests"

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
        if(currIndex < 6) {
            setCurrProfile(userList[currIndex + 1]);
            setCurrPhoto(feedPhotos[currIndex + 1]);
            setCurrIndex(currIndex + 1);
        }
        else {
            setEndOfFeed(true);
        }
    }

    const handleDislike = () => {
        if(currIndex < 6) {
            setCurrProfile(userList[currIndex + 1]);
            setCurrPhoto(feedPhotos[currIndex + 1]);
            setCurrIndex(currIndex + 1);
        }
        else {
            setEndOfFeed(true);
        }
    }

    const matches = [
        "Alexandra",
        "Bella",
        "Cassandra",
        "Dory"
    ];

    function findUser(name) {
        return userList.find((user) => {
            return user.userName === name;
        })
    }

    function handleChooseUser(name) {
        let userObj = findUser(name);
        setMatchedUser(userObj);
        setPopupShow(true);
    }


    const match_notifs = matches.map( (match, index) =>
        <div className="menu-item1" onClick={() => handleChooseUser(match)}>
            You matched with {match}. See their profile now!
        </div>
    );
    
    function MatchPopup(props) {
        var head = props.user.userName;
        const handleOnClick = () => {
            props.onHide(); 
        };
    
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {head}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="popUpContent">
                    Age: {props.user.userAge}
                </div>
                <div className="popUpContent">
                    Location: {props.user.userCity}, {props.user.userState}
                </div>
                <div className="popUpContent">
                    Bio: {props.user.userBio}
                </div>
                <div className="popUpContent">
                    Interest: {props.user.userInterest}
                </div>
                <div className="popUpContent">
                    Instagram Account: {props.user.userInstagram}
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={handleOnClick}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
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
                            {match_notifs}
                        </div>
                        <div className="noMoreText">No more notifications</div>
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
                            <Link to="/login"><div className="menu-item2">Log Out</div></Link>
                        </div>
                    </div>
                </Popup>
                
            </div>
            <div className="body">
                <div className="card">
                    {endOfFeed ? (
                            <div className="endOfFeedText">No More Profiles!</div>
                    ) : (
                    <div>
                        <img src={currPhoto} alt="" className="userPhoto"  />
                        <div className="buttons dislikeButton" onClick={handleDislike}>
                            <img src={CrossIcon} alt="" height="40%" className="icons"></img>
                        </div>
                        <div className="buttons likeButton" onClick={handleLike}>
                            <img src={HeartIcon} alt="" height="50%" className="icons"></img>
                        </div>
                    </div>
                    )} 
                    
                </div>
                {!endOfFeed ? (
                    <div className="userInfo">
                        <div className="title">{currProfile.userName}, {currProfile.userAge}</div>
                        <div className="subtitle">{currProfile.userCity}, {currProfile.userState}</div>
                    </div>
                ) : null}
                
                <Link to="/hangmangame">
                    <div className="hangmanButton" onClick={handleDislike}>
                        <img src={HangmanIcon} alt="" className="hangmanIcon"></img>
                    </div>
                </Link>
            </div>
            <MatchPopup
                show={popupShow}
                onHide={() => setPopupShow(false)}
                user={matchedUser}
            />
        </div>
    );
}
export default Homepage;
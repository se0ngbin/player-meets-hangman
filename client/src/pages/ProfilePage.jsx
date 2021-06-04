/* code by Vanessa */

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import BellIcon from '../assets/bell_icon.png';
import UserIcon from '../assets/user_icon.png';
import "./Homepage.css"
import Guy from '../assets/guy.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const userList = require('./userList');

const userSelf = {
    "userName": "David Holmwood",
    "userAge": "23",
    "userCity": "San Francisco",
    "userState": "California",
    "userBio": "Curabitur et sodales ante. Ut vitae tincidunt tellus, et laoreet orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "userInterest": "Birdwatching",
    "userInstagram": "@davidig"
};

const Profile = () => {
    const [popupShow, setPopupShow] = useState(false);
    const [matchedUser, setMatchedUser] = useState({});

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
            <div className="body2">
                <div className="selfPic">
                    <img src={Guy} alt="" height="100%"/>
                </div>
                <div className="popUpContent">  
                    Name: {userSelf.userName}
                </div>
                <div className="popUpContent">  
                    Age: {userSelf.userAge}
                </div>
                <div className="popUpContent">
                    Location: {userSelf.userCity}, {userSelf.uerState}
                </div>
                <div className="popUpContent">
                    Bio: {userSelf.userBio}
                </div>
                <div className="popUpContent">
                    Interest: {userSelf.userInterest}
                </div>
                <div className="popUpContent">
                    Instagram Account: {userSelf.userInstagram}
                </div>
            </div>
            <MatchPopup
                show={popupShow}
                onHide={() => setPopupShow(false)}
                user={matchedUser}
            />
        </div>
    );
}
export default Profile;
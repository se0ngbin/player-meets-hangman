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
import { useAccordionToggle } from "react-bootstrap";

const userList = require('./userList');

const userSelf = {
    "userName": "Tickle Radish",
    "userAge": "18",
    "userCity": "LA",
    "userState": "California",
    "userBio": "student",
    "userInterest": "I am cool",
    "userInstagram": "radishes@gmail.com"
};

const Profile = ( props ) => {
    const [popupShow, setPopupShow] = useState(false);
    const [matchedUser, setMatchedUser] = useState({});
    const [userInfo, setUserInfo] = useState({});
    let url = `http://localhost:3001/profile/${props.currentUser}`

    const fetchInfo = async () => {

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json",
                            "Authorization": 'Bearer ' + localStorage.getItem("token") },
            });
            if (response.ok) {
                console.log("profile get successfully");
                const data = await response.json();
                console.log(data);
                setUserInfo(data);
            } else {
                console.log("didn't work.");
                console.log(response.status);
                console.log(props.currentUser)
                const data = await response.json()
                console.log(data);
            }
            return response.ok;
        } catch (err) {
            console.error("GET profile ", err);
            return err.status;
        }
    }

    function calculateAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    useEffect(() => {
        console.log(props.currentUser);
        fetchInfo();
    }, []);


    // const match_notifs = matches.map( (match, index) =>
    //     <div className="menu-item1" onClick={() => handleChooseUser(match)}>
    //         You matched with {match}. See their profile now!
    //     </div>
    // );
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
                    Bio: {props.user.userBio}
                </div>
                <div className="popUpContent">
                    Email Address: {props.user.userInstagram}
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
                <Link to="/">
                    <img src={Logo} alt="" height="30" className="logo"></img>
                </Link>
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
                            {/* {match_notifs} */}
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
                        <div className="selfInfo1">{userInfo.name}, {calculateAge(userInfo.birthdate)}</div>
                        <div className="selfInfo2">{userInfo.bio}</div>
                        <div className="menu2">
                            <Link to="/login"><div className="menu-item2">Log Out</div></Link>
                        </div>
                    </div>
                </Popup>

            </div>
            <div className="body2">
                <div className="selfPic">
                </div>
                <div className="popUpContent">  
                    Name: {userInfo.name}
                </div>
                <div className="popUpContent">  
                    Age: {calculateAge(userInfo.birthdate)}
                </div>
                <div className="popUpContent">
                    Bio: {userInfo.bio}
                </div>
                <div className="popUpContent">
                    Email: {userInfo.username}
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
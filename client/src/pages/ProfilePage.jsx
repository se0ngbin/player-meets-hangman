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

// const userSelf = {
//     "userName": "Tickle Radish",
//     "userAge": "18",
//     "userCity": "LA",
//     "userState": "California",
//     "userBio": "student",
//     "userInterest": "I am cool",
//     "userInstagram": "radishes@gmail.com"
// };

const Profile = (currentuser) => {
    const [popupShow, setPopupShow] = useState(false);
    const [matchedUser, setMatchedUser] = useState({});
    const [currProfile, setCurrProfile] = useState(userList[0]);
    console.log('current user', currProfile)
    let url = `http://localhost:3001/profile/${localStorage.getItem("username")}`

    // TODO: for some reason, this it is not recognizing currentuser as a string but as a object
    const fetchFeed = async () => {

        // Trying to GET random profile. Worked before now it doesn't work :(
        // but GET requests worked when I tried to get "/genders" or "/interests"

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
                setCurrProfile(data);
            } else {
                console.log("didn't work.");
                console.log(response.status);
                console.log(currentuser)
                const data = await response.json()
                console.log(data);
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
                        </div>
                        <div className="selfInfo1">Seongbin Park (18)</div>
                        <div className="selfInfo2">LA, California</div>
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
                    Name: {currProfile.name}
                </div>
                <div className="popUpContent">  
                    Age: {currProfile.birthdate}
                </div>
                <div className="popUpContent">
                    Location: USA
                </div>
                <div className="popUpContent">
                    Bio: {currProfile.bio}
                </div>
                <div className="popUpContent">
                    Fun Fact: {currProfile.genderinterestedinn}
                </div>
                <div className="popUpContent">
                    Instagram Account: {currProfile.username}
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
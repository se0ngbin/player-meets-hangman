import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
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

// const userList = require('./userList');

const feedPhotos = [
    Girl1,
    Girl2,
    Girl3,
    Girl4,
    Girl5,
    Girl6,
    Girl7,
];


const Homepage = (props) => {
    const history = useHistory();
    const [currIndex, setCurrIndex] = useState(0);
    const [currProfile, setCurrProfile] = useState({});
    const [currPhoto, setCurrPhoto] = useState(feedPhotos[0]);
    const [endOfFeed, setEndOfFeed] = useState(false);
    const [popupShow, setPopupShow] = useState(false);
    const [matchList, setMatchList] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [selfName, setSelfName] = useState("");
    const [selfAge, setSelfAge] = useState("");
    const [selfBio, setSelfBio] = useState("");
    const [chosenMatchedUser, setChosenMatchedUser] = useState({});

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

    const getSelfData = async () => {
        let selfDataUrl = "http://localhost:3001/profile/" + props.currentUser;
        try {
            const response = await fetch(selfDataUrl, {
                method: "GET"
            });
            if (response.ok) {
                console.log("user info get successfully");
                const data = await response.json();
                console.log(data.name, data.birthdate, data.bio);
                setSelfName(data.name);
                setSelfAge(calculateAge(data.birthdate));
                setSelfBio(data.bio);
            } else {
                console.log("didn't work.");
                console.log(response.status);
            }
        } catch (err) {
            console.error("GET user data", err);
            return err.status;
        }
    }

    const getMatchedInfo = async (match) => {
        try {
            const response = await fetch(`http://localhost:3001/profile/${match}`, {
                method: "GET",
                headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }
            });
            if (response.ok) {
                console.log("matched user info get successfully");
                const data = await response.json();
                console.log(data);
                let list = matchedUsers;
                list.push(data);
                setMatchedUsers(list);
            } else {
                console.log("didn't work.");
                console.log(response.status);
            }
        } catch (err) {
                console.error("GET matched user info", err);
                return err.status;
        }



    }



    const fetchMatches = async () => { 
        setMatchedUsers([]);
        setMatchList([]);
        try {
            const response = await fetch("http://localhost:3001/matches", {
                method: "GET",
                headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }
            });
            if (response.ok) {
                console.log("matches get successfully");
                const data = await response.json();
                console.log(data);
                let usernames = [];
                data.map((match) => 
                    usernames.push(match.username)
                );
                usernames.map((match) => getMatchedInfo(match));
                setMatchList(usernames);
            } else {
                console.log("didn't work.");
                console.log(response.status);
            }
        } catch (err) {
            console.error("GET matches", err);
            return err.status;
        }
    }

    
    // TODO: we could try to display all liked users for our search function
    const fetchLikes = async () => { 
        try {
        const response = await fetch("http://localhost:3001/likes", {
            method: "GET",
            headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") }
        });
        if (response.ok) {
            console.log("likes get successfully");
            const data = await response.json();
            console.log(data);
        } else {
            console.log("didn't work.");
            console.log(response.status);
        }
    } catch (err) {
        console.error("GET matches ", err);
        return err.status;
    }
    }

    const fetchFeed = async () => {
        try {
            const response = await fetch("http://localhost:3001/profile/random", {
                method: "GET"
            });
            if (response.ok) {
                console.log("profile get successfully");
                const data = await response.json();
                console.log(data);
                setCurrProfile(data);
                console.log("matchlist:", matchList);
                console.log("matchedUsers", matchedUsers);
            } else {
                console.log("didn't work.");
                console.log(response.status);
            }
        } catch (err) {
            console.error("GET random profile ", err);
            return err.status;
        }
    }

    useEffect(() => {
        fetchFeed();
        fetchMatches();
        getSelfData();
    }, []);

    const handleLike = async () => {
        try {
            const body = { userid: currProfile.id };
            const response = await fetch("http://localhost:3001/likes", {
              method: "POST",
              headers: { "Content-Type": "application/json",
                          "Authorization": 'Bearer ' + localStorage.getItem("token") },
              body: JSON.stringify(body),
            });
            if (response.ok) {
              console.log("liked successfully"); 
              console.log(response.status);
              fetchFeed();
              fetchMatches();
            } else {
              console.log(response.status);
              console.log("nope... suck it up and start debugging again");
            }
        } 
        catch (err) 
        {
            console.error("like", err);
            return err.status;
        }

        setCurrPhoto(feedPhotos[currIndex + 1]);
    }

    const handleDislike = () => {
        fetchFeed();
    }

    function logOut() {
        console.log("called");
        props.setAuth(false);
        history.push('/');
    }

    const handleChooseMatch = ( name ) => {
        matchedUsers.map((user) => {
            if (user.name === name) {
                setChosenMatchedUser(user);
                setPopupShow(true);
            }
        })
    }


    const match_notifs = matchedUsers.map( (match) => 
        <div className="menu-item1" onClick={() => handleChooseMatch(match.name)}>
            You matched with {match.name}. See their profile now!
        </div>
    )
    
    
    // when we click on a match notification, display a popup with user's contact info
    function MatchPopup(props) {
        var head = props.user.name;
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
                    Age: {calculateAge(props.user.birthdate)}
                </div>
                <div className="popUpContent">
                    Bio: {props.user.bio}
                </div>
                <div className="popUpContent">
                    Email: {props.user.username}
                </div>
                <div className="popUpContent">
                    Contact: {props.user.contact}
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
                        <Link to="/profile">
                            <div className="selfInfo1">{selfName}, {selfAge}</div>
                            <div className="selfInfo2">{selfBio}</div>
                        </Link>
                        <div className="menu2" onClick={logOut}>
                            <div className="menu-item2"><Button variant="link" onClick={logOut}> Log Out </Button></div>
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
                        <div className="title">{currProfile.name}, {calculateAge(currProfile.birthdate)}</div>
                        <div className="subtitle">{currProfile.bio}</div>
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
                user={chosenMatchedUser}
            />
        </div>
    );
}
export default Homepage;

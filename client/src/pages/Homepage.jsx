import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import BellIcon from '../assets/bell_icon.png';
import UserIcon from '../assets/user_icon.png';
import "./Homepage.css"
import Girl1 from '../assets/girl1.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrossIcon from '../assets/cross_icon.png';
import HeartIcon from '../assets/heart_icon.png';


const userList = require("./userList");


const Homepage = () => {

    const [feed, setFeed] = useState(userList);
    const [currIndex, setCurrIndex] = useState(0);
    const [currProfile, setCurrProfile] = useState(userList[0]);
    let girl1 = Girl1;

    const fetchFeed = async () => {
        try {
            // const response = await fetch("http://localhost:3000");
            // const jsonData = await response.json();

            // console.log(response);
            // setFeed(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        console.log(userList[0]);
        fetchFeed();
    }, []);

    const handleLike = () => {
        setCurrProfile(userList[currIndex+1]);
        setCurrIndex(currIndex + 1);
    }

    const handleDislike = () => {
        setCurrProfile(userList[currIndex + 1]);
        setCurrIndex(currIndex + 1);
    }
    
    return (
        <div>
            <div className="navbar">
                <img src={Logo} alt="" height="30" className="logo"></img>
                <img src={BellIcon} alt="" height="25" className="bellIcon"></img>
                <Link to="/login"><img src={UserIcon} alt="" height="25" className="userIcon"></img></Link>
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

// class Homepage extends Component {
//     render() {
        
//         return (
//             <div>
//                 <div className="navbar">
//                     <img src={Logo} height="30" className="logo"></img>
//                     <img src={BellIcon} height="25" className="bellIcon"></img>
//                     <Link to="/login"><img src={UserIcon} height="25" className="userIcon"></img></Link>
//                 </div>
//                 <div className="body">
//                     <div className="behindLayer1">
//                     </div>
//                     <div className="card">
//                             <img className="userPhoto" src={Girl1} />
//                             <div className="buttons dislikeButton">
//                                 <img src={CrossIcon} height="40%" className="icons"></img>
//                             </div>
//                             <div className="buttons likeButton">
//                                 <img src={HeartIcon} height="50%" className="icons"></img>
//                             </div>
//                         </div>
//                     <div className="userInfo">
//                         <div className="title">{userName}, {userAge}</div>
//                         <div className="subtitle">{userCity}, {userState}</div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }


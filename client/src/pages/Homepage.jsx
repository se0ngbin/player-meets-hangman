import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import BellIcon from '../assets/bell_icon.png';
import UserIcon from '../assets/user_icon.png';
import "./Homepage.css"
import Girl1 from '../assets/girl1.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';


class Homepage extends Component {
    render() {
        let userName = "Alexandra";
        let userAge = "24";
        let userCity = "Los Angeles";
        let userState = "California";
        return (
            <div>
                <div className="navbar">
                    <img src={Logo} height="30" className="logo"></img>
                    <img src={BellIcon} height="25" className="bellIcon"></img>
                    <Link to="/login"><img src={UserIcon} height="25" className="userIcon"></img></Link>
                </div>
                <div className="body">
                    <div className="behindLayer1">
                    </div>
                    <div className="card">
                            <img src={Girl1}></img>
                        </div>
                    <div className="userInfo">
                        <div className="title">{userName}, {userAge}</div>
                        <div className="subtitle">{userCity}, {userState}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;
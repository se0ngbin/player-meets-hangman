import React, { Component } from "react";
import Logo from '../assets/logo.png'
import BellIcon from '../assets/bell_icon.png';
import UserIcon from '../assets/user_icon.png';
import "./Homepage.css"
import 'bootstrap/dist/css/bootstrap.min.css';

class Homepage extends Component {
    render() {
        return (
            <div>
                <div className="navbar">
                    <img src={Logo} height="30" className="logo"></img>
                    <img src={BellIcon} height="25" className="bellIcon"></img>
                    <img src={UserIcon} height="25" className="userIcon"></img>
                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}

export default Homepage;
//import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/WW_logo_blue.png';
import profileIcon from '../../assets/profile_icon.png';
import './Navbar.css';


function Navbar(){

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                    <Link to="/">
                    <img src={logo} className='navbar-logo' alt="Logo" />
                    </Link>
                    </div>

                    <div>
                        <div className="navbar-right"> 
                        <Link to="./pages/profilePage">
                        <img src={profileIcon} className='profile-icon' alt="Profile icon" />
                        </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
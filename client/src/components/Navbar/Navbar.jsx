import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/WW_logo_blue.png';
import profileIcon from '../../assets/profile_icon.png';
import { UserContext } from '../../components/context/UserContext';
import './Navbar.css';

function Navbar() {
  const { logout, token } = useContext(UserContext);
  const location = useLocation()
  const hideNavButtons = location.pathname === '/signin' || location.pathname === '/signup' ;


  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-left'>
          <Link to='/'>
            <img src={logo} className='navbar-logo' alt='Logo' />
          </Link>
        </div>

        <div className='navbar-right'>
          {/* Profile icon and link to profile page */}
          {token && !hideNavButtons && (
            <Link to='/profile'>
              <img src={profileIcon} className='profile-icon' alt='Profile icon' />
            </Link>
          )}
          
          {/* Logout button, only visible if user is logged in */}
          {token && !hideNavButtons &&(
            <button onClick={logout} className='logout-button'>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

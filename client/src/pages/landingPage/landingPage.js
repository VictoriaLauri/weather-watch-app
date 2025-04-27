import React from 'react'
import { Link } from 'react-router-dom' // Importing Link for navigation

const LandingPage = () => {
  return (
    <div className='landing-container'>
      <h1>Welcome to WeatherWatch</h1>
      <p>
        Get personalized movie recommendations based on the weather at your
        location.
      </p>

      <div className='button-container'>
        <Link to='/signup'>
          <button className='landing-button'>Sign Up</button>
        </Link>
        <Link to='/signin'>
          <button className='landing-button'>Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

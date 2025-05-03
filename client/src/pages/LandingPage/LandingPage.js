import React, { useContext } from 'react'
import { Link } from 'react-router-dom' // Importing Link for navigation
import { UserContext } from '../../components/context/UserContext'

const LandingPage = () => {
  const {token} = useContext(UserContext)

  return (
    <div className='landing-container'>
      <h1>Welcome to WeatherWatch</h1>
      <p>
        Get personalised movie recommendations based on the weather at your
        location.
      </p>

      <div className='button-container'>
        {!token ?(
          <>
        <Link to='/signup'>
          <button className='landing-button'>Sign Up</button>
        </Link>
        <Link to='/signin'>
          <button className='landing-button'>Sign In</button>
        </Link>
        </> ):( 
        <Link to='/watch'>
          <button className='landing-button'>Straight to Suggestions</button>
        </Link> 
        )}
      </div>
    </div>
  )
}

export default LandingPage

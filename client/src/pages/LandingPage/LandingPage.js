import React, { useContext } from 'react'
import { Link } from 'react-router-dom' // Importing Link for navigation
import { UserContext } from '../../components/context/UserContext'
import logoIcon from '../../assets/WW_logo_white.png';
import skyBackground from '../../assets/sky-background.png';
import cloudsBackground from '../../assets/clouds-background.png';
import './LandingPage.css'

const LandingPage = () => {
  const {token} = useContext(UserContext)

  return (
    <div className='landing-container'>
       <section className="top-section" style={{
    background: `url(${skyBackground}) no-repeat center/cover`,}}>

    <div className="logo-title">
        <img src={logoIcon} alt="WeatherWatch logo" className="logo-icon" />
      </div>

      <p className="tagline">Let the weather set the scene.</p>

      <p className="description">
          Your perfect movie night starts with the sky above! Whether it's a rainy evening, a sunny afternoon, or a chilly winter night, WeatherWatch curates the best films to match the weather outside.
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
      </section>
      <section className="bottom-section" style={{
    background: `url(${cloudsBackground}) no-repeat center/cover`,}}>
      </section>
    </div>
  )
}

export default LandingPage

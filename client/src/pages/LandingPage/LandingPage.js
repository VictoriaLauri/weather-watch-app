import React, { useContext } from 'react'
import { Link } from 'react-router-dom' // Importing Link for navigation
import { UserContext } from '../../components/context/UserContext'
import logoIcon from '../../assets/WW_logo_white.png';
import skyBackground from '../../assets/sky-background.png';
import clouds from '../../assets/clouds-background.png'
import BackgroundWrapper from "../../components/BackgroundWrapper/BackgroundWrapper"
import './LandingPage.css'

const LandingPage = () => {
  const {token} = useContext(UserContext)

  return (
    <BackgroundWrapper backgroundOverride={clouds}>
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
        </section>
      <div className='button-container'>
        <p className='accessInfo'>Sign up or Sign in to access your suggestion</p>
        {!token ?(
          <>
        <Link to='/signup'>
          <button className='landing-buttonSU' title='Click here to sign up'>Sign Up</button>
        </Link>
        <Link to='/signin'>
          <button className='landing-buttonSI' title='Click here to sign in'>Sign In</button>
        </Link>
        </> ):( 
        <Link to='/watch'>
          <button className='landing-button' title='Click here for your movie suggestion'>Straight to Suggestions</button>
        </Link> 
        )}
      </div>
     
    </div>
    </BackgroundWrapper>
  )
  
}

export default LandingPage

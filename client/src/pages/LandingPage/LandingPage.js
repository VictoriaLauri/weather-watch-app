import React from 'react'
import { Link } from 'react-router-dom' // Importing Link for navigation
import './LandingPage.css'
import logoIcon from '../../assets/WW_logo_white.png';
import skyBackground from '../../assets/sky-background.png';
import cloudsBackground from '../../assets/clouds-background.png';
import LocationSelect from './LocationSelect.js';


const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="top-section" style={{
    background: `url(${skyBackground}) no-repeat center/cover`,}}>

      <div className="logo-title">
        <img src={logoIcon} alt="WeatherWatch logo" className="logo-icon" />
      </div>

      <p className="tagline">Let the weather set the scene.</p>

      <p className="description">
          Your perfect movie night starts with the sky above! Whether it's a rainy evening, a sunny afternoon, or a chilly winter night, WeatherWatch curates the best films to match the weather outside.
        </p>

        <div className="auth-buttons">
          <Link to="/signup" className="btn-primary">Sign up now</Link>
          <span>or</span>
          <Link to="/signin" className="btn-link">sign in</Link>
        </div>
        </section>

        <section className="bottom-section" style={{
    background: `url(${cloudsBackground}) no-repeat center/cover`,}}>

<p className="guest-label"><strong>Use as a guest</strong><br/>(Your preferences <strong>won’t</strong> be saved)</p>

          <LocationSelect />


        <br/>
        <Link to="/watch" className="btn-guest"> What should I watch? </Link>
      </section>
    </div>
  )
}

export default LandingPage
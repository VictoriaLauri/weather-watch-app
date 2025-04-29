import React from 'react'
import { Link } from 'react-router-dom' // Importing Link for navigation
import './Landingpage.css'
import skyBackground from '../../assets/sky-background.png'; // adjust as needed
import cloudsBackground from '../../assets/clouds-background.png';
import LocationSelect from './LocationSelect.js';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="top-section" style={{
    background: `url(${skyBackground}) no-repeat center/cover`,}}>

      <p className="header"> Welcome to WeatherWatch </p>

      <p className="tagline">Let the weather set the scene.</p>

      <p className="description">
          Your perfect movie night starts with the sky above! Whether it's a rainy evening, a sunny afternoon, or a chilly winter night, WeatherWatch curates the best films to match the weather outside.
        </p>

        <div className="auth-buttons">
          <Link to="client/src/pages/SigningInPage/SigningUpPage.js" className="btn-primary">Sign up now</Link>
          <span>or</span>
          <Link to="client/src/pages/SigningUpPage/SigningInPage.js" className="btn-link"> sign in </Link>
        </div>
        </section>

        <section className="bottom-section" style={{
    background: `url(${cloudsBackground}) no-repeat center/cover`,}}>

        <p className="guest-label"><strong>Use as a guest</strong><br />(Your preferences wont be saved)</p>

          <LocationSelect />


        <br/>
        <Link to="client/src/pages/MovieInformation/MovieInformation.js" className="btn-guest"> What should I watch? </Link>
      </section>
    </div>
  )
}

export default LandingPage


const popularCities = [
  { name: "New York", country: "US" },
  { name: "London", country: "GB" },
  { name: "Tokyo", country: "JP" },
  { name: "Paris", country: "FR" },
  { name: "Sydney", country: "AU" },
  { name: "Berlin", country: "DE" },
  { name: "Toronto", country: "CA" },
  { name: "São Paulo", country: "BR" },
  { name: "Cairo", country: "EG" },
  { name: "Mumbai", country: "IN" },
];

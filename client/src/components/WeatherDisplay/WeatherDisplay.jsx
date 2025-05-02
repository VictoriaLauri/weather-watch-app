import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { RecommendMovie } from '../RecommendMovie/RecommendMovie.jsx'
import FormatCondition from './FormatCondition'
import getIconFromWeather from './GetIconFromWeather'
import getMoodFromWeather from './GetMoodFromWeather'
import './WeatherDisplay.css'

const WeatherDisplay = () => {
  const { weather, loading, locationError } = useContext(UserContext)

  if (loading) return <p>Loading weather...</p>
  if (locationError) return <p>{locationError}</p>
  if (!weather) return <p>No weather data available.</p>

  //user's location
  const location = weather.name
  const country = weather.sys.country



  //to send weather and receive the mood, get the little icon and
  // format the weather in a nicer way
  const condition = weather.weather[0].main.toLowerCase()
  const formatcondition = FormatCondition(condition)
  const mood = getMoodFromWeather(condition)
  const icon = getIconFromWeather(condition)

  const isSunny = condition.includes('clear');
  const isDarkBackground = !isSunny; // rainy, cloudy, snowy, etc.

  return (
    <>
      <div className='app-container'>
      <div className={`weather-and-movie-container ${isDarkBackground ? 'dark-text' : 'light-text'}`}>

          {/* Weather information */}
          <div className='weather-info-card'>
            <div className='weather-header-content'>
              <img className='weather-icon' src={icon} alt='Weather Icon' />
              <p>
                Hello!
                <br />
                You are in
              </p>
            </div>

            <div className='text-group'>
              <h2>{location}</h2>
              <p>{country}</p>
            </div>

            <hr />

            <div className='text-group'>
              <p>and it is</p>
              <h2>{formatcondition}</h2>
            </div>

            <hr />

            <div className='text-group'>
              <p>so you should watch something</p>
              <h2>{mood}</h2>
            </div>

            <hr />

            <p className='change-location'>
              Not in {location}?{' '}
              <button className='location-button'>Change location.</button>
            </p>
          </div>

          <div className='movie-info-card'>

            {/* Second and Third Columns: Movie and decade buttons */}
            <RecommendMovie />

          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherDisplay

import { useContext } from 'react'
import {UserContext} from '../context/UserContext'

export const WeatherDisplay = () => {
  const { weather, loading, locationError } = useContext(UserContext)

  if (loading) return <p>Loading weather...</p>
  if (locationError) return <p>{locationError}</p>
  if (!weather) return <p>No weather data available.</p>

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>🌤️ Condition: {weather.weather[0].main}</p>
      <p>🌡️ Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
    </div>
  )
}

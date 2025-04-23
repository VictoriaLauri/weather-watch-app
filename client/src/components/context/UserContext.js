import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [coords, setCoords] = useState(null)
  const [userAge, setUserAge] = useState(25) // Temporary hardcoded age
  const [locationError, setLocationError] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get user's geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCoords({ latitude, longitude })
      },
      (err) => {
        console.error('Geolocation error:', err)
        setLocationError('Could not get your location')
        setLoading(false)
      }
    )
  }, [])

  // Once we have coordinates, fetch the weather from backend
  useEffect(() => {
    if (!coords) return

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/weather?lat=${coords.latitude}&lon=${coords.longitude}`
        )
        if (!response.ok) throw new Error('Failed to fetch weather data')
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLocationError('Failed to fetch weather data')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [coords])

  return (
    <UserContext.Provider
      value={{ coords, userAge, setUserAge, locationError, weather, loading }}
    >
      {children}
    </UserContext.Provider>
  )
}

export {UserContext}
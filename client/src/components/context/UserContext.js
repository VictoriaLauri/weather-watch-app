import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [coords, setCoords] = useState(null)
  const [userAge, setUserAge] = useState(null) // fetches from database
  const [locationError, setLocationError] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  // initially set movie to null, then check local storage for a stored movie
  // if found, set movie to that value, otherwise set it to null
  const [movie, setMovie] = useState(() => {
    const storedMovie = localStorage.getItem('recommendedMovie')
    return storedMovie ? JSON.parse(storedMovie) : null
  })
  const [loadingMovie, setLoadingMovie] = useState(false)
  const [movieError, setMovieError] = useState('')
  const [selectedDecades, setSelectedDecades] = useState([])
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [location, setLocation] = useState(null)
  const [country, setCountry] = useState(null)

  const navigate = useNavigate()

  //token check
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage) // ensure the user is logged in if token exists
    }
  }, []) // effect only runs once when the component is mounted

  // Token LocalStorage Sync
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token) // Sync the token to localStorage whenever it changes
    }
  }, [token])

  // Get user's geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log('Geolocation position:', position)
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
    if (!coords) {
      console.log('Coords are not set yet')
      return
    }
    console.log('Fetching weather with coords:', coords)

    // HTTP request to fetch weather data from the backend using the coordinates
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/weather?lat=${coords.latitude}&lon=${coords.longitude}`
        )
        if (!response.ok) throw new Error('Failed to fetch weather data')
        const data = await response.json()

        console.log('Weather data:', data)
        setLocation(data.name)
        setCountry(data.sys.country)
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

  // Fetch user age from backend using the token
  // This is done to ensure that the user age is fetched only once when the token is available
  useEffect(() => {
    const fetchUserAge = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/auth/userinfo',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (!response.ok) throw new Error('Failed to fetch user info')
        const data = await response.json()
        if (data.age) {
          console.log('Fetched age from backend:', data.age)
          setUserAge(data.age)
        }
      } catch (err) {
        console.error('Error fetching user info:', err)
      }
    }

    if (token) {
      fetchUserAge()
    }
  }, [token])

  // Fetch movie recommendation when weather, decades filter and user age are available
  const fetchMovieRecommendation = useCallback(async () => {
    if (!coords || !weather || userAge === null || isNaN(userAge)) {
      console.warn('Data for fetching not ready yet:', {
        coords,
        weather,
        userAge,
      })
      return
    }
    const decadeQuery = selectedDecades.join(',')

    try {
      setLoadingMovie(true)
      setMovieError('')
      const response = await fetch(
        `http://localhost:8000/api/movie?lat=${coords.latitude}&lon=${coords.longitude}&age=${userAge}&decades=${decadeQuery}`
      )
      if (!response.ok) throw new Error('Failed to fetch movie data')
      const data = await response.json()
      setMovie(data.movie)
      console.log('Movie recommendation:', data.movie)
    } catch (err) {
      console.error(err)
      setMovieError('Failed to fetch movie recommendation')
    } finally {
      setLoadingMovie(false)
    }
  }, [coords, weather, userAge, selectedDecades])
  // Fetch movie recommendation when weather, decades filter and user age are available

  // sync movie with local storage
  useEffect(() => {
    if (movie) {
      localStorage.setItem('recommendedMovie', JSON.stringify(movie))
    }
  }, [movie])

  //add token to local storage
  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    // remove everything user-specific
    localStorage.removeItem('token')
    localStorage.removeItem('recommendedMovie')
    setToken(null)
    setMovie(null)
    // redirect to sign-in
    navigate('/signin', { replace: true })
    setTimeout(() => {
      alert('You have logged out')
    }, 100)
  }

  return (
    <UserContext.Provider
      value={{
        coords,
        userAge,
        setUserAge,
        locationError,
        weather,
        loading,
        movie,
        loadingMovie,
        movieError,
        fetchMovieRecommendation,
        selectedDecades,
        setSelectedDecades,
        token,
        setToken,
        location,
        country,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext }

// Double fetch of both weather and movie in dev is normal under React 18 StrictMode, would only run once in production
// https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects

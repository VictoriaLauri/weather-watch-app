import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import './RecommendMovie.css'

export const RecommendMovie = () => {
  const { coords, userAge, weather } = useContext(UserContext)
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!coords || !weather) return // Wait until both coordinates and weather are available

    const fetchMovieRecommendation = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movie?lat=${coords.latitude}&lon=${coords.longitude}&age=${userAge}`
        )
        if (!response.ok) throw new Error('Failed to fetch movie data')
        const data = await response.json()
        setMovie(data.movie)
        console.log(data.movie)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch movie recommendation')
        setLoading(false)
      }
    }

    fetchMovieRecommendation()
  }, [coords, weather, userAge]) // Trigger the effect when coordinates, weather, or user age change

  if (loading) return <p>Loading movie recommendation...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      {movie ? (
         //<h2>Recommended Movie: {movie.title}</h2>
         //<p>{movie.overview}</p>
       <>
          {movie.poster_path && (
            <img className="movie-container"
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title}
            />
          )}
        </>
      ) : (
        <p>No movie recommendation available.</p>
      )}
    </div>
  )
}

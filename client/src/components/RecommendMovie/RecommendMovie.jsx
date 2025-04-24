import React, { useContext, useEffect, useState } from 'react'
import { genreMap } from '../../utils/GenreIDMap'
import { UserContext } from '../context/UserContext'

export const RecommendMovie = () => {
  const { coords, userAge, weather } = useContext(UserContext)
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [shuffleTrigger, setShuffleTrigger] = useState(0)

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
  }, [coords, weather, userAge, shuffleTrigger]) // Trigger the effect when coordinates, weather, or user age change

  const handleShuffle = () => {
    setShuffleTrigger((prev) => prev + 1) // Increment the shuffle trigger to refetch the movie
  }

  if (loading) return <p>Loading movie recommendation...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      {movie ? (
        <>
          <h2>Recommended Movie: {movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
          <p>
            Genres:{' '}
            {movie.genre_ids
              .map((id) => genreMap[id])
              .filter(Boolean)
              .join(', ')}
          </p>

          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          )}
          <button onClick={handleShuffle}>Show me another suggestion</button>
        </>
      ) : (
        <p>No movie recommendation available.</p>
      )}
    </div>
  )
}

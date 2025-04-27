import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import './RecommendMovie.css'

export const RecommendMovie = () => {
  const {
    coords,
    userAge,
    weather,
    movie,
    loadingMovie,
    movieError,
    fetchMovieRecommendation,
  } = useContext(UserContext)
  const [shuffleTrigger, setShuffleTrigger] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (coords && weather) {
      fetchMovieRecommendation()
    }
  }, [coords, weather, userAge, shuffleTrigger, fetchMovieRecommendation]) // Trigger the effect when coordinates, weather, or user age change

  const handleShuffle = () => {
    setShuffleTrigger((prev) => prev + 1) // Increment the shuffle trigger to refetch the movie
  }

  if (loadingMovie) return <p>Loading movie recommendation...</p>
  if (movieError) return <p>{movieError}</p>

  const handleMovieClick = () => {
    navigate('/movie') // Navigate to the MovieDetailsPage
  }

  return (
    <>
      <div>
        {movie ? (
          <>
            <h4>Recommended Movie: {movie.title}</h4>
            {movie.poster_path && (
              <img
                className='movie-container'
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={handleMovieClick}
              />
            )}
          </>
        ) : (
          <p>No movie recommendation available.</p>
        )}
      </div>
      <button className='refresh-button' onClick={handleShuffle}>
        Give me another option!
      </button>
    </>
  )
}

import React, { useContext, useEffect } from 'react'
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
    selectedDecades,
    setSelectedDecades,
  } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (coords && weather && !movie) {
      fetchMovieRecommendation()
    }
  }, [coords, weather, userAge, movie, fetchMovieRecommendation])

  const handleShuffle = () => {
    fetchMovieRecommendation()
  }

  if (loadingMovie) return <p>Loading movie recommendation...</p>
  if (movieError) return <p>{movieError}</p>

  const handleMovieClick = () => {
    navigate('/movie')
  }

  const decadeOptions = [
    'Classic Pre-1970s',
    'Retro 70s and 80s',
    '90s and 2000s Throwback',
    'Modern 2010s',
    '2020s Fresh Hits',
  ]

  const toggleDecade = (decade) => {
    if (selectedDecades.includes(decade)) {
      setSelectedDecades(selectedDecades.filter((d) => d !== decade))
    } else {
      setSelectedDecades([...selectedDecades, decade])
    }
  }

  const handleFilter = () => {
    fetchMovieRecommendation()
  }

  const clearDecades = () => {
    setSelectedDecades([])
  }

  return (
    <div className="recommend-movie-container">
      {/* Movie Display */}
      <div className="movie-display-column">
        {movie ? (
          <>
            <h4>Recommended Movie: {movie.title}</h4>
            {movie.poster_path && (
              <img
                className="movie-container"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={handleMovieClick}
              />
            )}
          </>
        ) : (
          <p>No movie recommendation available.</p>
        )}
        <button className="refresh-button" onClick={handleShuffle}>
          Give me another option!
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="actions-column">
        {decadeOptions.map((decade) => (
          <button
            key={decade}
            onClick={() => toggleDecade(decade)}
            className={selectedDecades.includes(decade) ? 'selected' : ''}
          >
            {decade}
          </button>
        ))}

        {selectedDecades.length > 0 && (
          <>
            <button onClick={handleFilter} className="filter-button">
              Filter by Era
            </button>
            <button onClick={clearDecades} className="clear-button">
              Clear Filters
            </button>
          </>
        )}
      </div>
    </div>
  )
}

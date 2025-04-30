import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { genreMap } from '../../utils/GenreIDMap'

const MovieInformation = () => {
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve movie from localStorage
    const savedMovie = JSON.parse(localStorage.getItem('recommendedMovie'))
    if (savedMovie) {
      setMovie(savedMovie)
    }
  }, [])

  const handleBack = () => {
    // Navigate back to the HomePageMovieSuggestion
    navigate('/watch')
  }

  // Function to extract the release year
  const getReleaseYear = (date) => {
    const releaseDate = new Date(date)
    return releaseDate.getFullYear() // This returns only the year
  }

  const formatNumber = (num) => {
    return num ? num.toFixed(1) : 'No data available' // Check for null or undefined
  }

  return (
    <div className='movie-details-page'>
      <button onClick={handleBack} className='back-button'>
        Back to Suggestions Page
      </button>

      {movie ? (
        <div className='movie-details'>
          <h1>{movie.title}</h1>
          <img
            className='movie-poster'
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <p>
            Genres:{' '}
            {movie.genre_ids
              .map((id) => genreMap[id])
              .filter(Boolean)
              .join(', ')}
          </p>
          <p>{movie.overview}</p>
          <p>Release Year: {getReleaseYear(movie.release_date)}</p>
          <p>Popularity: {formatNumber(movie.popularity)}</p>
          <p>Rating: {formatNumber(movie.vote_average)}</p>
        </div>
      ) : (
        <p>Movie details not found.</p>
      )}
    </div>
  )
}

export default MovieInformation

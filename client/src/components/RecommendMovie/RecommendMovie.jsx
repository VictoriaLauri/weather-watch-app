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

  // Trigger the effect when coordinates, weather, or user age change
  useEffect(() => {
    if (coords && weather && !movie) {
      fetchMovieRecommendation()
    }
  }, [coords, weather, userAge, movie, fetchMovieRecommendation])

  //Logging selected decades to console to show filers are working
  useEffect(() => {
    console.log('Selected Decades:', selectedDecades)
  }, [selectedDecades]) // Sync movie with local storage

  const handleShuffle = () => {
    fetchMovieRecommendation()
  }

  if (loadingMovie) return <p>Loading movie recommendation...</p>
  if (movieError) return <p>{movieError}</p>

  const handleMovieClick = () => {
    navigate('/movie') // Navigate to the MovieDetailsPage
  }
  // Decade options for filtering
  const decadeOptions = [
    'Classic Pre-1970s',
    'Retro 70s and 80s',
    'Throwback 90s and 2000s',
    'Modern 2010s',
    'Fresh Hits 2020s',
  ]
  // Function to handle decade selection
  const toggleDecade = (decade) => {
    if (selectedDecades.includes(decade)) {
      setSelectedDecades(selectedDecades.filter((d) => d !== decade))
    } else {
      setSelectedDecades([...selectedDecades, decade])
    }
  }

  const handleFilter = () => {
    fetchMovieRecommendation() // Trigger the fetch based on selected decades
  }
  //remove selected decades from the filter
  const clearDecades = () => {
    setSelectedDecades([])
  }

  const handleMovieNavigate = () => {
    navigate('/movie') // Navigate to the MovieDetailsPage
  }

  const condition = weather?.weather?.[0]?.main?.toLowerCase()
  const isClear = condition?.includes('clear')

  return (
    <>
      <div className='movieInfoAndChange'>
        {movie ? (
          <>
            <h3 className={`movieTitle ${isClear ? '' : 'darkText'}`}>
              {movie.title}
            </h3>
            {movie.poster_path && (
              <div className='imagelink'>
              <a href='/movie'><img
                className='movie-container'
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={handleMovieClick}
              />
              <button className='learnmore'>
                Learn more
              </button>
              </a>
              </div>
            )}
          </>
        ) : (
          <p>No movie recommendation available.</p>
        )}

      
        
        <button className='refresh-button' onClick={handleShuffle}>
          Give me another option!
        </button>
      </div>
      <div className='decade-filters'>
        {decadeOptions.map((decade) => (
          <button
            key={decade}
            onClick={() => toggleDecade(decade)}
            className={`decade-button ${
              selectedDecades.includes(decade) ? 'selected' : ''
            } ${isClear ? '' : 'darkText'}`}
          >
            {decade}
          </button>
        ))}
        {selectedDecades.length > 0 && (
          <>
            <button
              onClick={handleFilter}
              className={`filter-button ${isClear ? '' : 'darkText'}`}
            >
              Filter by Era
            </button>
            <button
              onClick={clearDecades}
              className={`clear-button ${isClear ? '' : 'darkText'}`}
            >
              Clear Filters
            </button>
          </>
        )}
      </div>
    </>
  )
}

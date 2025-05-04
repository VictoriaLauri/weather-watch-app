import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { genreMap } from '../../utils/GenreIDMap'
import './MovieInformation.css'



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
<div className='movie-container'> 

{/* Back button */}
<button onClick={handleBack} className='back-button'>
    Back to Suggestions Page
</button>

{movie ? (
  <div className='movie-content'>

          {/* Left column: Movie details */}
          <div className="movie-info-section">
          
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-year">{getReleaseYear(movie.release_date)}</p>
                                                    
              <div className="rating-section">
                <div className="rating-box">
                <p>Popularity</p>
                <p className="rating-value">{formatNumber(movie.popularity)}</p>
              </div>

              <div className="rating-box">
                  <p>Rating</p>
                  <p className="rating-value">{formatNumber(movie.vote_average * 10)}</p>
              </div>
              
          </div>
                              
                                          
          <p className="movie-genres">
                Genres: {movie.genre_ids
                  .map((id) => genreMap[id])
                  .filter(Boolean)
                  .join(', ')}
          </p>

          <p>{movie.overview}</p>
    
  </div>
              {/* Right column: Movie poster */}
              <div className='movie-poster-container'>
                      <img
                        className='movie-poster'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
              </div>
        
</div>
        
      
      ) : (
          <p>Movie details not found.</p>
      )}


</div>
</div>
  );
};

export default MovieInformation;
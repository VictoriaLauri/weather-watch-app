import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { genreMap } from "../../utils/GenreIDMap"
import { UserContext } from "../../components/context/UserContext"
import "./MovieInformation.css"

const MovieInformation = () => {
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()
  const { weather } = useContext(UserContext)

  useEffect(() => {
    // Retrieve movie from localStorage
    const savedMovie = JSON.parse(localStorage.getItem("recommendedMovie"))
    if (savedMovie) {
      setMovie(savedMovie)
    }
  }, [])

  const handleBack = () => {
    // Navigate back to the HomePageMovieSuggestion
    navigate("/watch")
  }

  // Function to extract the release year
  const getReleaseYear = (date) => {
    const releaseDate = new Date(date)
    return releaseDate.getFullYear() // This returns only the year
  }

  const formatNumber = (num) => {
    return num ? num.toFixed(1) : "No data available" // Check for null or undefined
  }

  const condition = weather?.weather?.[0]?.main?.toLowerCase()
  const isClear = condition?.includes("clear")
  return (
    <div className="page-center-wrapper">
      <div className="glassbox">
        {movie ? (
          <div className={`AllInfoMovie ${isClear ? "darkText" : ""}`}>
            <div className="movie-details">
              <h1>{movie.title}</h1>
              <hr />

              <p>
                Genres:{" "}
                {movie.genre_ids
                  .map((id) => genreMap[id])
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="overview">{movie.overview}</p>
              <hr />
              <p>
                <span>Release Year: </span>
                {getReleaseYear(movie.release_date)}
              </p>
              <p>
                <span>Popularity: </span>
                {formatNumber(movie.popularity)}
              </p>
              <p>
                <span>Rating:</span> {formatNumber(movie.vote_average)}
              </p>
              <button onClick={handleBack} className="back-button">
                Back to Suggestions Page
              </button>
            </div>

            <div className="movieposter">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          </div>
        ) : (
          <p>Movie details not found.</p>
        )}
      </div>
    </div>
  )
}

export default MovieInformation

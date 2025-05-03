import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import FormatCondition from './FormatCondition';
import getIconFromWeather from './GetIconFromWeather';
import getMoodFromWeather from './GetMoodFromWeather';
import './WeatherAndMovieDisplay.css';

const WeatherAndMovieDisplay = () => {
  const {
    weather,
    loading,
    locationError,
    coords,
    userAge,
    movie,
    loadingMovie,
    movieError,
    fetchMovieRecommendation,
    selectedDecades,
    setSelectedDecades,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // Fetch movie recommendations when necessary
  useEffect(() => {
    if (coords && weather && !movie) {
      fetchMovieRecommendation();
    }
  }, [coords, weather, userAge, movie, fetchMovieRecommendation]);

  if (loading) return <p>Loading weather...</p>;
  if (locationError) return <p>{locationError}</p>;
  if (!weather) return <p>No weather data available.</p>;

  // Extract weather-related data
  const location = weather.name;
  const country = weather.sys.country;
  const condition = weather.weather[0].main.toLowerCase();
  const formatCondition = FormatCondition(condition);
  const mood = getMoodFromWeather(condition);
  const icon = getIconFromWeather(condition);
  const isSunny = condition.includes('clear');
  const isDarkBackground = !isSunny;

  // Handle movie-related actions
  const handleShuffle = () => fetchMovieRecommendation();
  const handleMovieClick = () => navigate('/movie');
  const decadeOptions = [
    'Classic Pre-1970s',
    'Retro 70s and 80s',
    '90s and 2000s Throwback',
    'Modern 2010s',
    '2020s Fresh Hits',
  ];
  const toggleDecade = (decade) =>
    setSelectedDecades(
      selectedDecades.includes(decade)
        ? selectedDecades.filter((d) => d !== decade)
        : [...selectedDecades, decade]
    );
  const handleFilter = () => fetchMovieRecommendation();
  const clearDecades = () => setSelectedDecades([]);

  return (
    <div className="app-container">
      <div className={`weather-and-movie-container ${isDarkBackground ? 'dark-text' : 'light-text'}`}>
        {/* First Column: Weather Information */}
        <div className="weather-info-card">
          <div className="weather-header-content">
            <img className="weather-icon" src={icon} alt="Weather Icon" />
            <p>
              Hello!
              <br />
              You are in
            </p>
          </div>

          <div className="text-group">
            <h2>{location}</h2>
            <p>{country}</p>
          </div>

          <hr />

          <div className="text-group">
            <p>and it is</p>
            <h2>{formatCondition}</h2>
          </div>

          <hr />

          <div className="text-group">
            <p>so you should watch something</p>
            <h2>{mood}</h2>
          </div>

          <hr />

          <p className="change-location">
            Not in {location}?{' '}
            <button className="location-button">Change location.</button>
          </p>
        </div>

        {/* Second Column: Movie Recommendations */}
        <div className="movie-info-card">
          {loadingMovie ? (
            <p>Loading movie recommendation...</p>
          ) : movieError ? (
            <p>{movieError}</p>
          ) : movie ? (
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
              <button className="refresh-button" onClick={handleShuffle}>
                Give me another option!
              </button>
            </>
          ) : (
            <p>No movie recommendation available.</p>
          )}
        </div>

        {/* Third Column: Filter Buttons */}
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
    </div>
  );
};

export default WeatherAndMovieDisplay;

import axios from 'axios'
import { getGenresByWeather } from '../utils/getGenresByWeather.js'
import { isAgeAppropriate } from '../utils/isAgeAppropriate.js'

// Fetch certification for a given movie, as there is no certification info in the movie details we need to fetch it separately from the release dates endpoint
const getCertification = async (movieId) => {
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  const url = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${TMDB_API_KEY}`
  try {
    const res = await axios.get(url)
    const gbRelease = res.data.results.find(
      (entry) => entry.iso_3166_1 === 'GB'
    )
    const certification = gbRelease?.release_dates?.[0]?.certification || null
    return certification
  } catch (err) {
    console.error('Error fetching certification:', err.message)
    return null
  }
}

export const fetchMovieByWeatherAndAge = async (weather, userAge) => {
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  const genreIds = getGenresByWeather(weather)
  // Check if genreIds is empty
  if (genreIds.length === 0) {
    throw new Error('No genres found for the given weather condition.')
  }
  // Randomly select a genre ID from the genreMapper as we have more than one genre for each weather condition
  for (let attempt = 0; attempt < 3; attempt++) {
    const randomGenre = genreIds[Math.floor(Math.random() * genreIds.length)]
    const randomPage = Math.floor(Math.random() * 50) + 1 // This will give access to 1000 movies

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${randomGenre}&language=en-US&page=${randomPage}`
    const res = await axios.get(url)
    const movies = res.data.results

    const randomMovie = movies[Math.floor(Math.random() * movies.length)]
    const certification = await getCertification(randomMovie.id)

    if (isAgeAppropriate(certification, userAge)) {
      return randomMovie
    }
  }

  // Fallback: Get a Family movie (genre ID 10751)
  const fallbackPage = Math.floor(Math.random() * 20) + 1 // This will give access to 400 movies
  const fallbackUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10751&language=en-US&page=${fallbackPage}`
  const fallbackRes = await axios.get(fallbackUrl)
  const fallbackMovies = fallbackRes.data.results

  return fallbackMovies[Math.floor(Math.random() * fallbackMovies.length)]
}

import axios from 'axios'
import { getGenresByWeather } from '../utils/getGenresByWeather.js'
import { isAgeAppropriate } from '../utils/isAgeAppropriate.js'
import { mapDecadesToRanges } from '../utils/mapDecadesToRanges.js'

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

// Fetch a movie based on weather, user age, and selected decades
// This function will return a random movie that fits the criteria
export const fetchMovieByWeatherAndAge = async (
  weather,
  userAge,
  selectedDecades = []
) => {
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  const genreIds = getGenresByWeather(weather)
  // Check if genreIds is empty
  if (genreIds.length === 0) {
    throw new Error('No genres found for the given weather condition.')
  }
  // Randomly select a genre ID from the genreMapper as we have more than one genre for each weather condition
  for (let attempt = 0; attempt < 5; attempt++) {
    // there are more than one genre for each weather condition, so we randomly select one
    const randomGenre = genreIds[Math.floor(Math.random() * genreIds.length)]
    // default page size is 20, so we can get 100 movies in 5 pages
    let allMovies = []
    for (let page = 1; page < 5; page++) {
      // a pool of 2000 movies to avoid repeated movies
      const randomPage = Math.floor(Math.random() * 100) + 1
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${randomGenre}&language=en-US&page=${randomPage}`
      const res = await axios.get(url)
      const movies = res.data.results
      // Filter out movies without a release date
      const usableMovies = movies.filter((movie) => movie.release_date)
      // Concatenate all movies from the pages
      allMovies = allMovies.concat(usableMovies)
    }

    const validMovies = []

    for (const movie of allMovies) {
      const releaseYear = new Date(movie.release_date).getFullYear()

      // Check against the selected eras(decades)
      const fitsDecade = selectedDecades.some((decade) => {
        const range = mapDecadesToRanges(decade)
        if (!range) {
          console.error(`Unknown decade label: ${decade}`)
          return false
        }
        return releaseYear >= range.start && releaseYear <= range.end
      })

      if (!fitsDecade) continue

      // Fetch and check certification
      const certification = await getCertification(movie.id)
      if (isAgeAppropriate(certification, userAge)) {
        validMovies.push(movie)
      }
    }
    if (validMovies.length > 0) {
      // Randomly select a valid movie
      const randomMovie =
        validMovies[Math.floor(Math.random() * validMovies.length)]

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

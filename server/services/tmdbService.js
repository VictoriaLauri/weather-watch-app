import axios from 'axios'

// Map genre name to TMDB genre ID
const genreMap = {
  Comedy: 35,
  Drama: 18,
  Fantasy: 14,
  Thriller: 53,
  Adventure: 12,
}

export const fetchMovieByGenre = async (genre = 'Comedy') => {
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  console.log(TMDB_API_KEY)

  const genreId = genreMap[genre]

  const url = `https://api.themoviedb.org/3/discover/movie` +
              `?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US`;

  try {
    const res = await axios.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const movies = res.data.results
    console.log('Fetched movies:', movies)
    const randomMovie = movies[Math.floor(Math.random() * movies.length)]
    return randomMovie
  } catch (err) {
    console.error('Failed to fetch movies:', err)
    throw err
  }
}

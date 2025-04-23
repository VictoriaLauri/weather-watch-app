import { fetchMovieByGenre } from '../services/tmdbService.js'

export const getMovie = async (req, res) => {
  // Default to 'Comedy' if no genre is provided
  const genre = 'Drama'

  try {
    console.log('Received request:', req.query)
    const movie = await fetchMovieByGenre(genre)
    res.status(200).json(movie)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Could not fetch movie.', details: err.message })
  }
}

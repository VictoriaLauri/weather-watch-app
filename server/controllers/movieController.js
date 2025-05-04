import { fetchMovieByWeatherAndAge } from '../services/tmdbService.js'
import { getWeatherData } from '../services/weatherService.js'

export const getMovieRecommendation = async (req, res) => {
  const { lat, lon, age, decades } = req.query
  // Validate the input parameters
  if (!lat || !lon || isNaN(age)) {
    return res
      .status(400)
      .json({ error: 'Missing or invalid lat, lon, or age' })
  }
  // Receive the decades as a comma-separated string and convert it to an array
  const selectedDecades = decades ? decades.split(',') : []

  try {
    // Use the weatherService instead of repeating the fetch logic
    const weatherData = await getWeatherData(lat, lon)
    const weatherCondition = weatherData.weather?.[0]?.main || 'Clear'

    // Get a weather + age appropriate movie
    const movie = await fetchMovieByWeatherAndAge(
      weatherCondition,
      age,
      selectedDecades
    )
    // send the weather info and movie recommendation as a response
    res.json({
      weather: weatherCondition,
      movie,
    })
  } catch (err) {
    console.error('Error getting movie recommendation:', err.message)
    res.status(500).json({ error: 'Failed to get movie recommendation' })
  }
}

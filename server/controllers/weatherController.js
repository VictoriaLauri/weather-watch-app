import { getWeatherData } from '../services/weatherService.js'

export const getWeather = async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude' })
  }

  try {
    const data = await getWeatherData(lat, lon)
    res.json(data)
  } catch (error) {
    console.error('Weather API error:', error.message)
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
}

import axios from 'axios'

export const getWeather = async (req, res) => {
  const { lat, lon } = req.query
  const weatherApiKey = process.env.WEATHER_API_KEY

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude' })
  }

  if (!weatherApiKey) {
    console.error('Missing WEATHER_API_KEY in environment variables.')
    return res
      .status(500)
      .json({ error: 'Server misconfiguration: Missing API key' })
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
    const response = await axios.get(url)
    res.json(response.data)
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
}

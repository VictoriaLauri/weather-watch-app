import axios from 'axios'

// fetch weather data from OpenWeatherMap API using latitude and longitude
export const getWeatherData = async (lat, lon) => {
  const weatherApiKey = process.env.WEATHER_API_KEY

  if (!weatherApiKey) {
    throw new Error('Missing WEATHER_API_KEY in environment variables.')
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
  const response = await axios.get(url)
  return response.data
}

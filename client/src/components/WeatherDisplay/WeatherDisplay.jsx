import { useEffect, useState } from "react"

export const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // get coordinates from browser gps location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log("coords from browser", latitude, longitude)

        fetch(`http://localhost:8000/weather?lat=${latitude}&lon=${longitude}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch weather")
            return res.json()
          })
          .then((data) => {
            setWeather(data) // updates weather data for coordinates
            setError("")
          })
          .catch((err) => {
            console.error(err)
            setError("Failed to fetch weather stuff")
          })
          .finally(() => setLoading(false)) // changes loading to false as process has been completed
      },

      (err) => {
        // if fetch does not work then error will be set
        console.error("Geolocation error:", err)
        setError("Could not get your location")
        setLoading(false)
      }
    )
  }, [])
// Information to user whilst loading or if error
  if (loading) return <p>Loading weather...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>🌤️ Condition: {weather.weather[0].main}</p>
    </div>
  )
}

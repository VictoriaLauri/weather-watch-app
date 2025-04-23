// This function maps weather conditions to movie genres based on the OpenWeatherMap API
export function getGenresByWeather(condition) {
  switch (condition) {
    case 'Clear':
      return [35, 12] // Comedy, Adventure
    case 'Clouds':
      return [28, 878] // Action, Sci-Fi
    case 'Rain':
    case 'Drizzle':
      return [18, 10749, 14] // Drama, Romance, Fantasy
    case 'Thunderstorm':
      return [53, 80] // Thriller, Crime
    case 'Snow':
      return [14, 10751] // Fantasy, Family
    case 'Mist':
    case 'Fog':
      return [9648, 53] // Mystery, Triller
    case 'Haze':
      return [878, 99] // Sci-Fi, Documentary
    case 'Smoke':
    case 'Dust':
      return [36, 37] // History, Western
    default:
      return [10751] // Fallback: Family
  }
}

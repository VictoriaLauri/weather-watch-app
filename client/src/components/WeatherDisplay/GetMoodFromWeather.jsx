//Function to get the mood of the movie recs

function getMoodFromWeather(condition) {
  switch (condition) {
    case 'clear': return 'funny'
    case 'clouds': return 'intense'
    case 'rain':
    case 'drizzle':
      return 'emotional'
    case 'thunderstorm': return 'thrilling'
    case 'snow': return 'magical'
    case 'mist':
    case 'fog':
      return 'mysterious'
    case 'haze': return 'thought-provoking'
    case 'smoke':
    case 'dust':
      return 'epic'
    default: return 'family-friendly'
  }
}


  export default getMoodFromWeather;

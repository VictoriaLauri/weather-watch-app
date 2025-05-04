//Function to get the mood of the movie recs

function getMoodFromWeather(condition) {
  switch (condition) {
    case 'clear': return 'Funny'
    case 'clouds': return 'Intense'
    case 'rain':
    case 'drizzle':
      return 'Emotional'
    case 'thunderstorm': return 'Thrilling'
    case 'snow': return 'Magical'
    case 'mist':
    case 'fog':
      return 'Mysterious'
    case 'haze': return 'Thought-provoking'
    case 'smoke':
    case 'dust':
      return 'Epic'
    default: return 'Family-friendly'
  }
}


  export default getMoodFromWeather;

//Function to make the weather condition into "it is x" format

export function FormatCondition(condition) {
    switch (condition) {
      case 'clear':
        return 'Sunny or Clear'
      case 'clouds':
        return 'Cloudy'
      case 'rain':
      case 'drizzle':
        return 'Rainy'
      case 'thunderstorm':
        return 'Stormy'
      case 'snow':
        return 'Snowy'
      case 'mist':
      case 'fog':
      case 'haze':
        return 'Foggy'
      case 'smoke':
      case 'dust':
        return 'Hazy'
      default:
        return 'Nice'
    }
  }

  export default FormatCondition;
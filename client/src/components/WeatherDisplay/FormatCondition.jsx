//Function to make the weather condition into "it is x" format

export function FormatCondition(condition) {
    switch (condition) {
      case 'clear':
        return 'sunny'
      case 'clouds':
        return 'cloudy'
      case 'rain':
      case 'drizzle':
        return 'rainy'
      case 'thunderstorm':
        return 'stormy'
      case 'snow':
        return 'snowy'
      case 'mist':
      case 'fog':
      case 'haze':
        return 'foggy'
      case 'smoke':
      case 'dust':
        return 'hazy'
      default:
        return 'nice'
    }
  }

  export default FormatCondition;
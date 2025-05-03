//Function to get the icon next to the greeting according to the weather

  
  
  function getIconFromWeather(condition) {
    switch (condition) {
      case 'clear': return '/icons/sunny_icon.png'
      case 'clouds': return '/icons/cloudy_icon.png'
      case 'rain':
      case 'drizzle':
        return '/icons/rainy_icon.png'
      case 'thunderstorm': return '/icons/cloudy_icon.png'
      case 'snow': return '/icons/snowy_icon.png'
      case 'mist':
      case 'fog':
        return '/icons/cloudy_icon.png'
      case 'haze': return '/icons/cloudy_icon.png'
      case 'smoke':
      case 'dust':
        return '/icons/cloudy_icon.png'
      default: return 'c/icons/sunny_icon.png'
    }
}

  
  export default getIconFromWeather;
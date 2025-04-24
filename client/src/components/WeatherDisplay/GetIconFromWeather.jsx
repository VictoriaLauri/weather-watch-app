//Function to get the icon next to the greeting according to the weather

function getIconFromWeather(condition) {
    switch (condition) {
      case 'sunny': return '/icons/sunny_icon.png'
      case 'rain': return '/icons/rainy.png'
      case 'clouds': return '/icons/cloudy_icon.png'
      case 'snow': return '/icons/snowy_icon.png'
      default: return 'c/icons/sunny_icon.png'
    }
  }  
  
  export default getIconFromWeather;
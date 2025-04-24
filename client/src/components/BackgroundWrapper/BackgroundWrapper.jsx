import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const BackgroundWrapper = ({ children }) => {
  const { weather } = useContext(UserContext);

  // Match weather to background image and 
  // default to sunny image if there is no weather data 
  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return '/backgrounds/sunny.png';
      case 'Rain':
      case 'Drizzle':
        return '/backgrounds/rainy.png';
      case 'Clouds':
        return '/backgrounds/cloudy.png';
      case 'Snow':
        return '/backgrounds/snowy.png';
      default:
        return '/backgrounds/sunny.png';
    }
  };

  const backgroundImage = weather ? getBackgroundImage(weather.weather[0].main) : 'assets/sunny.png';

  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
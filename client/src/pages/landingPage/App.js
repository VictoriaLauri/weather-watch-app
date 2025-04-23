import { UserProvider } from '../../components/context/UserContext'
import { RecommendMovie } from '../../components/RecommendMovie/RecommendMovie'
import { WeatherDisplay } from '../../components/WeatherDisplay/WeatherDisplay'
import './App.css'

function App() {
  return (
    <UserProvider>
      <div className='App'>
        <h2>WeatherWatch</h2>
        <div className='container'>
          <WeatherDisplay />
          <RecommendMovie />
        </div>
      </div>
    </UserProvider>
  )
}

export default App

import React from 'react'
import { UserProvider } from '../../components/context/UserContext'
// import { RecommendMovie } from '../../components/RecommendMovie/RecommendMovie'
import BackgroundWrapper from '../../components/BackgroundWrapper/BackgroundWrapper'
import Navbar from '../../components/Navbar/Navbar'
import { WeatherDisplay } from '../../components/WeatherDisplay/WeatherDisplay'
import './App.css'

function App() {
  return (
    <UserProvider>
      <BackgroundWrapper>
        <Navbar />
        <WeatherDisplay />
      </BackgroundWrapper>
    </UserProvider>
  )
}

export default App

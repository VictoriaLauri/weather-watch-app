import React from 'react';
import { UserProvider } from '../../components/context/UserContext'
import { RecommendMovie } from '../../components/RecommendMovie/RecommendMovie'
import { WeatherDisplay } from '../../components/WeatherDisplay/WeatherDisplay'
import Navbar from '../../components/Navbar/Navbar'
import './App.css'

function App() {
  return (
    <UserProvider>
      <div className='App'>
      <div><Navbar/></div>
        <div className='container'>
          <WeatherDisplay />
          <RecommendMovie />
        </div>
      </div>
    </UserProvider>
  )
}

export default App

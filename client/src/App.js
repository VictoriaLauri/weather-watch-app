import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BackgroundWrapper from './components/BackgroundWrapper/BackgroundWrapper'
import { UserProvider } from './components/context/UserContext'
import Navbar from './components/Navbar/Navbar'
import HomePageMovieSuggestion from './pages/HomePageMovieSuggestion/HomePageMovieSuggestion'
import LandingPage from './pages/LandingPage/LandingPage'
import MovieInformation from './pages/MovieInformation/MovieInformation'
import SigningInPage from './pages/SigningInPage/SigningInPage'
import SigningUpPage from './pages/SigningUpPage/SigningUpPage'

function App() {
  return (
    <UserProvider>
      <BackgroundWrapper>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signin' element={<SigningInPage />} />
          <Route path='/signup' element={<SigningUpPage />} />
          <Route path='/watch' element={<HomePageMovieSuggestion />} />
          <Route path='/movie' element={<MovieInformation />} />
        </Routes>
      </BackgroundWrapper>
    </UserProvider>
  )
}

export default App

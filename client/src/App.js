import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BackgroundWrapper from './components/BackgroundWrapper/BackgroundWrapper'
import { UserProvider } from './components/context/UserContext'
import Navbar from './components/Navbar/Navbar'
import HomepageMovieSuggestion from './pagesTemp/HomepageMovieSuggestionTemp/HomepageMovieSuggestionTemp'
import LandingPage from './pagesTemp/LandingPageTemp/LandingPageTemp'
import MovieInformation from './pagesTemp/MovieInformationTemp/MovieInformationTemp'
import SigningInPage from './pagesTemp/SigningInPageTemp/SigningInPageTemp'
import SigningUpPage from './pagesTemp/SigningUpPageTemp/SigningUpPageTemp'

function App() {
  return (
    <UserProvider>
      <BackgroundWrapper>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signin' element={<SigningInPage />} />
          <Route path='/signup' element={<SigningUpPage />} />
          <Route path='/watch' element={<HomepageMovieSuggestion />} />
          <Route path='/movie' element={<MovieInformation />} />
        </Routes>
      </BackgroundWrapper>
    </UserProvider>
  )
}

export default App

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import BackgroundWrapper from './components/BackgroundWrapper/BackgroundWrapper'
import { UserProvider } from './components/context/UserContext'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <UserProvider>
      <Router>
        <BackgroundWrapper>
          <Navbar />
          <Routes>
            <Route path='/' element={<landingPage />} />
            <Route path='/signin' element={<signingInPage />} />
            <Route path='/signup' element={<signingUpPage />} />
            <Route path='/watch' element={<homepageMovieSuggestion />} />
          </Routes>
        </BackgroundWrapper>
      </Router>
    </UserProvider>
  )
}

export default App

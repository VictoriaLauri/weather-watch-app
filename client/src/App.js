import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import BackgroundWrapper from './components/BackgroundWrapper/BackgroundWrapper'
import { UserContext } from './components/context/UserContext'
import Navbar from './components/Navbar/Navbar'
import HomepageMovieSuggestion from './pages/HomepageMovieSuggestion/HomepageMovieSuggestion'
import LandingPage from './pages/LandingPage/LandingPage'
import MovieInformation from './pages/MovieInformation/MovieInformation'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SigningInPage from './pages/SigningInPage/SigningInPage'
import SigningUpPage from './pages/SigningUpPage/SigningUpPage'

function ProtectedRoute({ element }) {
  const { token } = useContext(UserContext)
  // no token, redirect to the sign-in page
  return token ? element : <Navigate to='/signin' />
}

function App() {
  const { setToken } = useContext(UserContext)

  // token persists on page refresh
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken) // loads token into context
    }
  }, [setToken])

  return (
    <BackgroundWrapper>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SigningInPage />} />
        <Route path='/signup' element={<SigningUpPage />} />
        <Route path='/watch' element={<ProtectedRoute element={<HomepageMovieSuggestion />} />} />
        <Route path='/movie' element={<MovieInformation />} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
      </Routes>
    </BackgroundWrapper>
  )
}

export default App

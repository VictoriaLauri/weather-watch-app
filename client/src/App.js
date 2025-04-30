import React, { useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import BackgroundWrapper from './components/BackgroundWrapper/BackgroundWrapper'
import { UserProvider, UserContext } from './components/context/UserContext'
import Navbar from './components/Navbar/Navbar'
import HomepageMovieSuggestion from './pages/HomepageMovieSuggestion/HomepageMovieSuggestion'
import LandingPage from './pages/LandingPage/LandingPage'
import MovieInformation from './pages/MovieInformation/MovieInformation'
import SigningInPage from './pages/SigningInPage/SigningInPage'
import SigningUpPage from './pages/SigningUpPage/SigningUpPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function ProtectedRoute({ element }) {
  const { token } = useContext(UserContext);
  // no token, redirect to the sign-in page
  return token ? element : <Navigate to="/signin" />;
}

function App() {
  const { setToken } = useContext(UserContext);

  // token persists on page refresh
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken); // loads token into context
    }
  }, [setToken]);

  return (
    <UserProvider>
      <BackgroundWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SigningInPage />} />
          <Route path="/signup" element={<SigningUpPage />} />
          <Route path="/watch" element={<HomepageMovieSuggestion />} />
          <Route path="/movie" element={<MovieInformation />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        </Routes>
      </BackgroundWrapper>
    </UserProvider>
  );
}

export default App;


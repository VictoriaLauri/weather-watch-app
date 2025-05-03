import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RecommendMovie } from '../components/Testmovie/testmovie'
import { UserContext } from '../components/context/UserContext'
import { MemoryRouter } from 'react-router-dom' // This will now use the mocked version

// Mock the fetchMovieRecommendation function
const mockFetchMovieRecommendation = jest.fn()

// Helper function to render with context
const renderWithContext = (value) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={value}>
        <RecommendMovie />
      </UserContext.Provider>
    </MemoryRouter>
  )
}

describe('RecommendMovie Component', () => {
  test('renders loading state when movie is being fetched', () => {
    const contextValue = {
      coords: { lat: 0, lon: 0 },
      userAge: 25,
      weather: 'sunny',
      movie: null,
      loadingMovie: true,
      movieError: null,
      fetchMovieRecommendation: mockFetchMovieRecommendation,
      selectedDecades: [],
      setSelectedDecades: jest.fn(),
    }

    renderWithContext(contextValue)

    expect(screen.getByText(/Loading movie recommendation.../i)).toBeInTheDocument()
  })

  test('renders error state when there is an error fetching movie', () => {
    const contextValue = {
      coords: { lat: 0, lon: 0 },
      userAge: 25,
      weather: 'sunny',
      movie: null,
      loadingMovie: false,
      movieError: 'Failed to fetch movie.',
      fetchMovieRecommendation: mockFetchMovieRecommendation,
      selectedDecades: [],
      setSelectedDecades: jest.fn(),
    }

    renderWithContext(contextValue)

    expect(screen.getByText(/Failed to fetch movie./i)).toBeInTheDocument()
  })

  test('renders movie recommendation when available', () => {
    const mockMovie = { title: 'The Matrix', poster_path: '/poster.jpg' }

    const contextValue = {
      coords: { lat: 0, lon: 0 },
      userAge: 25,
      weather: 'sunny',
      movie: mockMovie,
      loadingMovie: false,
      movieError: null,
      fetchMovieRecommendation: mockFetchMovieRecommendation,
      selectedDecades: [],
      setSelectedDecades: jest.fn(),
    }

    renderWithContext(contextValue)

    // Check that the movie title is rendered
    expect(screen.getByText(/Recommended Movie: The Matrix/i)).toBeInTheDocument()

    // Check that the movie poster is rendered correctly
    expect(screen.getByAltText('The Matrix')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/poster.jpg'
    )
  })

  test('renders "No movie recommendation available" when no movie is available', () => {
    const contextValue = {
      coords: { lat: 0, lon: 0 },
      userAge: 25,
      weather: 'sunny',
      movie: null,
      loadingMovie: false,
      movieError: null,
      fetchMovieRecommendation: mockFetchMovieRecommendation,
      selectedDecades: [],
      setSelectedDecades: jest.fn(),
    }

    renderWithContext(contextValue)

    expect(screen.getByText(/No movie recommendation available./i)).toBeInTheDocument()
  })
})

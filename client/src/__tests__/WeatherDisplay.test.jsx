import React from 'react'
import { render, screen } from '@testing-library/react'
import WeatherDisplay from '../components/WeatherDisplay/WeatherDisplay'
import { UserContext } from '../components/context/UserContext'

jest.mock('../components/RecommendMovie/RecommendMovie', () => ({
  RecommendMovie: () => <div>Give me another option!</div>
}));


const renderWithContext = (value) => {
  return render(
    <UserContext.Provider value={value}>
      <WeatherDisplay />
    </UserContext.Provider>
  )
}

describe('WeatherDisplay Component', () => {
  test('renders loading state correctly', () => {
    renderWithContext({
      weather: null,
      loading: true,
      locationError: null,
    })

    expect(screen.getByText(/Loading weather.../i)).toBeInTheDocument()
  })

  test('renders error state when locationError is set', () => {
    renderWithContext({
      weather: null,
      loading: false,
      locationError: 'Failed to load location.',
    })

    expect(screen.getByText(/Failed to load location./i)).toBeInTheDocument()
  })

  test('renders no weather data available message when weather is null', () => {
    renderWithContext({
      weather: null,
      loading: false,
      locationError: null,
    })

    expect(screen.getByText(/No weather data available./i)).toBeInTheDocument()
  })
  console.log('WeatherDisplay is', WeatherDisplay); // Should NOT be undefined

  test('renders weather and movie info correctly', () => {
    renderWithContext({
      weather: {
        name: 'New York',
        sys: { country: 'US' },
        weather: [{ main: 'Clear' }],
      },
      loading: false,
      locationError: null,
    });
  
    // Target the heading specifically containing "New York"
    expect(screen.getByRole('heading', { name: /New York/i })).toBeInTheDocument();
    expect(screen.getByText(/US/i)).toBeInTheDocument();
    expect(screen.getByText(/clear/i)).toBeInTheDocument();
    expect(screen.getByText(/you should watch something/i)).toBeInTheDocument();
    expect(screen.getByText(/Change location./i)).toBeInTheDocument();
   
  })
})

//checking if the default values are being passed properly to the context consumer

import { render, screen } from '@testing-library/react'
import React from 'react'
import { UserContext, UserProvider } from '../components/context/UserContext'

describe('UserContext', () => {
  it('should provide default values in context', () => {
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => (
            <>
              <div data-testid='user-age'>{value.userAge}</div>
              <div data-testid='movie-error'>{value.movieError}</div>
              <div data-testid='token'>{value.token || ''}</div>
            </>
          )}
        </UserContext.Consumer>
      </UserProvider>
    )

    expect(screen.getByTestId('user-age')).toHaveTextContent('25') // default userAge
    expect(screen.getByTestId('movie-error')).toHaveTextContent('') // default movieError
    expect(screen.getByTestId('token')).toHaveTextContent('') // default token
  })
})

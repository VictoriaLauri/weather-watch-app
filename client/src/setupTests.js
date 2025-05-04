// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';

// Mocking navigator.geolocation to prevent errors in the testing environment
global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementation((success, error) => {
      // Simulate a successful geolocation response
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
      });
      
      // If you want to mock an error response, you can do this instead:
      // error(new Error('Geolocation error'));
    }),
  };
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { UserProvider, UserContext } from "../components/context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(() => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ weather: "Sunny" }),
    })
  );
});

const TestComponent = () => {
  const { coords, locationError, weather, loading } = React.useContext(UserContext);

  if (locationError) return <div>{locationError}</div>;
  if (loading) return <div>Loading...</div>;
  if (coords && weather)
    return <div>{`Lat: ${coords.latitude}, Lon: ${coords.longitude}, Weather: ${weather.weather}`}</div>;

  return null;
};

describe("UserContext", () => {
  test("shows location and weather on success", async () => {
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({ coords: { latitude: 40.7128, longitude: -74.006 } })
    );

    render(
      <UserProvider>
        <Router>
          <TestComponent />
        </Router>
      </UserProvider>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Lat: 40.7128, Lon: -74.006, Weather: Sunny/i)
      ).toBeInTheDocument()
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/weather?lat=40.7128&lon=-74.006"
    );
  });

  test("shows error message when geolocation fails", async () => {
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error({ message: "Geolocation error" })
    );

    render(
      <UserProvider>
        <Router>
          <TestComponent />
        </Router>
      </UserProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("Could not get your location")).toBeInTheDocument()
    );
  });
});

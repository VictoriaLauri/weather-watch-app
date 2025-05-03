import React from "react"
import { render } from "@testing-library/react"
import BackgroundWrapper from "../components/BackgroundWrapper/BackgroundWrapper"
import { UserContext } from "../components/context/UserContext"
import customBackground from "../assets/sigin_in_background.png"

// Test to check background changes when weather changes or when on a page with an override.
const renderWithContext = (weather, backgroundOverride = null) => {
  return render(
    <UserContext.Provider value={{ weather }}>
      <BackgroundWrapper backgroundOverride={backgroundOverride}>
        <div>Mock Data</div>
      </BackgroundWrapper>
    </UserContext.Provider>
  )
}

describe("BackgroundWrapper", () => {
  test("renders default sunny background when no weather is available", () => {
    const { container } = renderWithContext(null)
    expect(container.firstChild).toHaveStyle(
      `background-image: url(/backgrounds/sunny.png)`
    )
  })

  test("renders sunny background for Clear weather", () => {
    const weather = { weather: [{ main: "Clear" }] }
    const { container } = renderWithContext(weather)
    expect(container.firstChild).toHaveStyle(
      `background-image: url(/backgrounds/sunny.png)`
    )
  })

  test("renders rainy background for Rain weather", () => {
    const weather = { weather: [{ main: "Rain" }] }
    const { container } = renderWithContext(weather)
    expect(container.firstChild).toHaveStyle(
      `background-image: url(/backgrounds/rainy.png)`
    )
  })

  test("renders cloudy background for Clouds weather", () => {
    const weather = { weather: [{ main: "Clouds" }] }
    const { container } = renderWithContext(weather)
    expect(container.firstChild).toHaveStyle(
      `background-image: url(/backgrounds/cloudy.png)`
    )
  })

  test("renders snowy background for Snow weather", () => {
    const weather = { weather: [{ main: "Snow" }] }
    const { container } = renderWithContext(weather)
    expect(container.firstChild).toHaveStyle(
      `background-image: url(/backgrounds/snowy.png)`
    )
  })

  test("uses backgroundOverride if provided", () => {
    const weather = { weather: [{ main: "Rain" }] }
    const { container } = renderWithContext(weather, customBackground)
    expect(container.firstChild).toHaveStyle(
      `background-image: url(${customBackground})`
    )
  })
})

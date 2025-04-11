import "./App.css"

function App() {
  const intros = [
    {
      id: 1,
      name: "Victoria",
      movie: "Autumn in New York",
      weather: "rainy",
      food: "ice cream",
    },
    {
      id: 2,
      name: "Sadie",
      movie: "Hercules",
      weather: "raining",
      food: "macaroni cheese",
    },
    {
      id: 3,
      name: "Kiki",
      movie: "the one I watch next as I rarely watch movies twice",
      weather: "sunny, cloudy, rainy, snowy, I love watching movies",
      food: "olives, wine and kitty cuddles",
    },
    {
      id: 4,
      name: "Safa",
      movie: "Pride & Prejudice",
      weather: "rainy",
      food: "hot chocolate",
    },
  ]

  return (
    <div className="App">
      <h2>Group-4-Fullstack Watch Party Picks</h2>

      <div className="watchParty">
        {intros.map((intro) => (
          <div className="blur">
            <div key={intro.id} className="intro-card">
              <h3>{intro.name}'s watch party:</h3>
              <p>
                My favorite movie is <strong>{intro.movie}.</strong>
              </p>
              <p>
                Watch it when the weather is <strong>{intro.weather}.</strong>
              </p>
              <p>
                Try some <strong>{intro.food}</strong> when watching it!
              </p>
            </div>
          </div>
        ))}
      </div>
      <h2>Code First Girls Spring 2025</h2>
    </div>
  )
}

export default App

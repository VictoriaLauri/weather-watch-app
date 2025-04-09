import './App.css';

function App() {
  const intros = [
    {
      id: 1,
      name: 'Victoria',
      movie: 'Autumn in New York',
      weather: 'rainy',
      food: 'ice cream',
    },
    {
      id: 2,
      name: 'Jane',
      movie: 'The Notebook',
      weather: 'sunny',
      food: 'popcorn',
    },
  ];

  return (
    <div className='App'>
      <h2>Group-4-Fullstack Watch Party Picks</h2>

      <div className='watchParty'>
        {intros.map((intro) => (
          <div key={intro.id} className='intro-card'>
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
        ))}
      </div>
    </div>
  );
}

export default App;

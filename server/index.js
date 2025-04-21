// Server index
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: 'configweatherwatch.env' });

const app = express();

const weatherRoutes = require('./routes/weather-routes');
// const movieRoutes = require('./routes/movie-routes');

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
}));

app.use('/weather', weatherRoutes);
// app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 8000; // Back End to run on port 8000 to avoid Apple conflict
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
 

});

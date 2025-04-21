import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import movieRoutes from './routes/movieRoutes.js'
import weatherRoutes from './routes/weather-routes.js'

const app = express()
// backend will run on 8000 to avoid Apple conflict
const PORT = process.env.PORT

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
}));

app.use('/weather', weatherRoutes);
app.use('/api', movieRoutes); // all movie routes start with /api

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);

});

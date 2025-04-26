import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { getMovieRecommendation } from './controllers/movieController.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // POST /register, /login
app.get('/api/recommendation', getMovieRecommendation); // GET /api/recommendation?lat=..&lon=..&age=..

// Port setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import movieRoutes from './routes/movieRoutes.js'


const app = express()
// backend will run on 8000 to avoid Apple conflict
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api', movieRoutes); // all movie routes start with /api

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { getMovieRecommendation } from "./controllers/movieController.js"
import { authenticateToken } from "./middleware.js"
import authRoutes from "./routes/authRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import weatherRoutes from "./routes/weatherRoutes.js"
dotenv.config({ path: "./configweatherwatch.env" }) // Load environment variables from configweatherwatch.env file

const app = express()
// backend will run on 8000 to avoid Apple conflict
const PORT = process.env.PORT || 8000

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)
app.use(express.json())

//root routes information
app.get("/", (req, res) => {
  res.send(
    "Welcome to the WeatherWatch API! Available routes: /api/auth, /api/movie, /api/recommendation and /weather"
  )
})

//api routes
app.use("/api/auth", authRoutes)
app.use("/weather", weatherRoutes)
app.use("/api", movieRoutes) // all movie routes start with /api

app.get("/api/recommendation", authenticateToken, getMovieRecommendation)

//starting server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})

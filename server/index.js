// server/index.js
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
// backend will run on 8000 to avoid Apple conflict
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('WeatherWatch backend is up!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

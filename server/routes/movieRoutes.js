import express from 'express'
import { getMovie } from '../controllers/movieController.js'

const router = express.Router()

// GET /api/movie?genre=Comedy
router.get('/movie', getMovie)

export default router

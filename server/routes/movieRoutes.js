import express from 'express'
import { getMovieRecommendation } from '../controllers/movieController.js'

const router = express.Router()

router.get('/movie', getMovieRecommendation)

export default router

import { jest } from '@jest/globals'
import express from 'express'
import request from 'supertest'

// ✅ mock service module before importing
jest.unstable_mockModule('../services/weatherService.js', () => ({
  getWeatherData: jest.fn().mockResolvedValue({
    weather: [{ description: 'clear sky' }],
    main: { temp: 293.15 },
  }),
}))

const { default: weatherRouter } = await import('../routes/weatherRoutes.js')
const app = express()
app.use(express.json())
app.use('/weather', weatherRouter)

describe('GET /weather', () => {
  it('should return 200 and some weather data', async () => {
    const response = await request(app).get('/weather?lat=51.5&lon=-0.1')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('weather')
  })
})

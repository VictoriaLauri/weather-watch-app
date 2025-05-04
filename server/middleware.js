// middleware.js
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// Middleware to check if the user is authenticated
// This middleware checks for a valid JWT token in the request headers
// and verifies it using the secret key stored in environment variables.
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' })
  }
  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: 'Invalid or expired token' })

    req.user = user
    next()
  })
}

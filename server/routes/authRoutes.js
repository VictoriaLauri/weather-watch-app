import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import { db } from '../db/db.js'

const router = express.Router()

//register
router.post('/register', async (req, res) => {
  const { username, password, age, email } = req.body

  try {
    const [existing] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await db.query(
      'INSERT INTO users (username, password, age, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, age, email]
    )

    const token = jwt.sign(
      { id: result.insertId, username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(201).json({ message: 'Registration successful', token })
  } catch (err) {
    console.error('Registration error:', err.message)
    res.status(500).json({ message: 'Internal server error' })
  }
})

//login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [
      username,
    ])
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const user = users[0]
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ message: 'Login successful', token })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update Profile
router.put('/update', async (req, res) => {
  const { id, username, email, password, currentPassword } = req.body

  try {
    // Retrieve the current user
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [id])

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const user = users[0]

    // Validate current password
    const match = await bcrypt.compare(currentPassword, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Incorrect current password' })
    }

    // Prepare update query
    let query = 'UPDATE users SET'
    const values = []
    // Only update fields that are provided
    if (username) {
      query += ' username = ?,'
      values.push(username)
    }
    if (email) {
      query += ' email = ?,'
      values.push(email)
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      query += ' password = ?,'
      values.push(hashedPassword)
    }

    // Remove trailing comma and add WHERE clause
    query = query.slice(0, -1) // Remove last comma
    query += ' WHERE id = ?'
    values.push(id)

    await db.query(query, values)
    res.json({ message: 'Profile updated successfully' })
  } catch (err) {
    console.error('Profile update error:', err.message)
    res.status(500).json({ message: 'Failed to update profile' })
  }
})

// Get current user info
router.get('/userinfo', async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'No token provided' })

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded token:', decoded)
    const [users] = await db.query(
      'SELECT id, username, email, age FROM users WHERE id = ?',
      [decoded.id]
    )
    if (users.length === 0)
      return res.status(404).json({ message: 'User not found' })

    res.json(users[0])
  } catch (err) {
    console.error('Token verification error:', err.message)
    res.status(401).json({ message: 'Invalid token' })
  }
})

export default router

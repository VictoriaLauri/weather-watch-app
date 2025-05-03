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

//update profile
router.put('/update', async (req, res) => {
  const { id, username, email, password } = req.body

  try {
    // Get the current user data from the database
    const [user] = await db.query(
      'SELECT username, email, age FROM users WHERE id = ?',
      [id]
    )
    //Prepare the update query, preserving the current age
    let query = 'UPDATE users SET username = ?, email = ?'
    const values = [username || user.username, email || user.email]

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      query += ', password = ?'
      values.push(hashedPassword)
    }

    query += ' WHERE id = ?'
    values.push(id)

    await db.query(query, values)
    res.json({ message: 'Profile updated successfully' })
  } catch (err) {
    console.error('Profile update error:', err.message)
    res.status(500).json({ message: 'Failed to update profile' })
  }
})

export default router

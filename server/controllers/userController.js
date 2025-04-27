import { db } from '../db/db.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  const { username, password, age, latitude, longitude } = req.body;

  try {
    const [existingUser] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO users (username, password, age, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, age, latitude, longitude]
    );

    res.status(201).json({ id: result.insertId, username, age, latitude, longitude });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

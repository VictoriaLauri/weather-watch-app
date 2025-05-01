import { db } from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Secret key for JWT (make sure to store this in an environment variable for production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

export const createUser = async (req, res) => {
  const { username, password, age, email } = req.body;

  try {
    const [existingUser] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO users (username, password, age, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, age, email]
    );

   // create a payload for the JWT 
   const payload = { userId: result.insertId, username };

   // generate the JWT token
   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

   // send the response with the token
   res.status(201).json({
     message: 'User created successfully',
     token, // return the JWT token
     user: { id: result.insertId, username, age, email } // return the user data
   });
 } catch (err) {
   console.error('Error creating user:', err);
   res.status(500).json({ error: 'Failed to create user' });
 }
};

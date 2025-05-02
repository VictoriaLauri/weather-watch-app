import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../components/context/UserContext';
import axios from 'axios';

const ProfilePage = () => {
  const { token } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    // validation
    if (!username || !email || !password) {
      alert('Please fill out all editable fields.');
      return;
    }

    try {
      await axios.patch(
        'http://localhost:8000/api/auth/update',
        {
          username,
          email,
          password,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="edit-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;


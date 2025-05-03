import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../components/context/UserContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import { isTokenValid } from '../../utils/tokenUtils';

const ProfilePage = () => {
  const { token } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    currentPassword: '', // To validate the changes
  });
  const [message, setMessage] = useState('');
  const [changedFields, setChangedFields] = useState({
    username: false,
    email: false,
    password: false,
  });



useEffect(() => {
  const fetchUser = async () => {
    if (!token || !isTokenValid(token)) return;

    try {
      const res = await axios.get('http://localhost:8000/api/auth/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { username, email } = res.data;
      setFormData(prev => ({
        ...prev,
        username,
        email,
      }));
    } catch (err) {
      console.error('Failed to fetch user:', err.response?.data || err.message);
    }
  };

  fetchUser();
}, [token]);


  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, currentPassword } = formData;

    // Validation
    if (!currentPassword) {
      alert('Please enter your current password to validate changes.');
      return;
    }

    if (!username && !email && !password) {
      alert('Please make at least one change.');
      return;
    }

    if(!token||!isTokenValid(token)){
      alert('Your session has expired. Please log in again')
      return
    }
    let userId = null
    if(token){
      try{
        const decodedToken = jwtDecode(token)
        userId = decodedToken.id
      }catch(error){
        console.error("Error decoding token:", error)
        alert('Failed to decode token')
        return
      }
    }

    try {
      const updatedData = {
        id: userId,
        username,
        email,
        password,
        currentPassword,
      };

      // Send request to the backend to update the profile
      const response = await axios.put(
        'http://localhost:8000/api/auth/update',
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If successful, show message and mark changes
      setMessage(response.data.message);
      setChangedFields({
        username: username !== '',
        email: email !== '',
        password: password !== '',
      });

    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message === 'Incorrect current password') {
        alert('You have entered an incorrect password.');
      } else {
        alert('Error updating profile');
      }
      
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {message && <p>{message}</p>} {/* Show success or error message */}
      
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPassword">Enter current password to confirm changes</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            required
          />
        </div>

        <button type="submit" className="edit-profile-btn">
          Update Profile
        </button>
      </form>

      {/* Display changes made */}
      <div className="changes-summary">
        {changedFields.username && <p>Username updated.</p>}
        {changedFields.email && <p>Email updated.</p>}
        {changedFields.password && <p>Password updated.</p>}
      </div>
    </div>
  );
};

export default ProfilePage;


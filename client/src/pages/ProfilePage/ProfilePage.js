import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const ProfilePage = () => {
  const { userAge, setUserAge, token } = useContext(UserContext);
  const [formData, setFormData] = useState({
    age: '',
    latitude: '',
    longitude: '',
  });

  
  useEffect(() => {
    if (token) {
      setFormData({
        age: userAge || '',
        latitude: '',
        longitude: '',
      });
    }
  }, [token, userAge]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        'http://localhost:8000/api/auth/update',
        {
          age: Number(formData.age),
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserAge(formData.age); 
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
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            step="any"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Enter your latitude"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            step="any"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Enter your longitude"
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


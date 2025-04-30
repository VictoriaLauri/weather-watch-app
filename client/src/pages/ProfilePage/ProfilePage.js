import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/context/UserContext'

const ProfilePage = () => {
  const { weather, userAge, setUserAge, token } = useContext(UserContext)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (token) {
      setFormData({
        name: 'John Doe',
        location: 'New York',
        email: 'john@example.com',
        password: '',
      })
    }
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
  }

  return (
    <div className='profile-page'>
      <header className='header'>
        <h1>Profile</h1>
      </header>

      <div className='profile-container'>
        <div className='profile-head'>
          <div className='glass-box'>
            <img
              src='/path/to/cloud-play-image.jpg'
              alt='Cloud Play'
              className='profile-image'
            />
            <div className='profile-info'>
              <p className='name'>{formData.name || 'Your Name'}</p>
              <p className='location'>{formData.location || 'Your Location'}</p>
            </div>
          </div>
        </div>

        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='Enter your location'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
            />
          </div>

          <button type='submit' className='edit-profile-btn'>
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage

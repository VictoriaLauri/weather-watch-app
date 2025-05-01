
import React, { useState, useContext, } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import "./SigningUpPage.css"
import signUpBackground from "../../assets/sign_up_background.png"
import BackgroundWrapper from "../../components/BackgroundWrapper/BackgroundWrapper"
import { UserContext } from "../../components/context/UserContext";

const SigningUpPage = () => {
  const navigate = useNavigate();
  const{setToken} = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    age: "",
    email: "",
    latitude: "",
    longitude: "",
  })

  const [showPassword, setShowPassword]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/auth/register", {
        ...formData,
        age: Number(formData.age), // age needs to be a number
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // save token to localStorage
      setToken(token); 

      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message)
    }
  }

  return (
    <BackgroundWrapper backgroundOverride={signUpBackground}>
      <div className="glassbox">
        <div className="formContainer">
        <h4>Create account</h4>
        <p>Sign up to get started</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            />

            <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            />

            <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          
        
<div className="passwordInputContainer">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
            <i
              className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#999'
              }}
            ></i>
        </div>
        

          <button type="submit">Sign Up</button>
          <p>Already have an account? <Link className="signInLink" to="/signingInPage">Sign in</Link></p>
        </form>
      </div>
      </div>
    </BackgroundWrapper>
  )
}

export default SigningUpPage

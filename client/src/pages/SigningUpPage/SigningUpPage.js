import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SigningUpPage.css'
import signUpBackground from '../../assets/sign_up_background.png'
import BackgroundWrapper from "../../components/BackgroundWrapper/BackgroundWrapper";

const SigningUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    age: "",
    email:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", {
        ...formData,
        age: Number(formData.age), // age needs to be a number!
        email: String(formData.email), // ensure email is treated as a string
      });
      navigate("/signingInPage");
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
    }
  };

  return (
    <BackgroundWrapper backgroundOverride = {signUpBackground}>
    <div>
      <h2>Sign Up</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
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
    
        <button type="submit">Register</button>
      </form>
    </div>
    </BackgroundWrapper> 
  );
  
};

export default SigningUpPage;



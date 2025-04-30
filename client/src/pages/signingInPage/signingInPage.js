import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigningInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", formData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/watch"); // 
      }
    } catch (error) {
      setError(error.response?.data.message || "Invalid credentials. Please try again.");
    }
  };
  return (
    <div>
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          
          <button type="submit">Log In</button>
          </form>
        </div>
      );
    };
    
    export default SigningInPage;

    
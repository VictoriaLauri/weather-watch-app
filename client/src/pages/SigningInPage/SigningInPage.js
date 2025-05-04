import React, { useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SigningInPage.css'
import BackgroundWrapper from "../../components/BackgroundWrapper/BackgroundWrapper";
import signinback from '../../assets/sigin_in_background.png'
import { Link } from "react-router-dom";
import { UserContext } from "../../components/context/UserContext";

const SigningInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

const {login}=useContext(UserContext)
const [showPassword, setShowPassword]=useState(false)

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
        login(response.data.token)
        // localStorage.setItem("token", response.data.token);
        navigate("/watch"); // 
      }
    } catch (error) {
      setError(error.response?.data.message || "Invalid credentials. Please try again.");
    }
  };
  return (
    <BackgroundWrapper backgroundOverride={signinback}>
    <div className="glassbox">
    <div className="formContainer">
      <h4>Welcome back</h4>
      <p>Log in with your email</p>
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
<div className="passwordInputContainer">
        <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
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

          <button type="submit">Log In</button>
          <p>New to WeatherWatch? <Link className="signInLink" to='../signup'>Create an account</Link></p>
          </form>
        </div>
        </div>
        </BackgroundWrapper>
        );
    };

    export default SigningInPage;

// import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import "../Styles/Signin.css";
import doclogo from "../assets/Doctermy.png";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
import steth from "../assets/Stethoscope.png";
import clock from "../assets/Clock.png";
import doctermy from "../assets/Inverselogo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://doctermy.onrender.com/api/v1/user/login",
        formData
      );
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.message === "Incorrect email") {
          setError("Incorrect Email");
        } else if (err.response.data.message === "Incorrect password") {
          setError("Incorrect Password");
        } else {
          setError("Failed to sign in");
        }
      } else {
        setError("Failed to sign in");
      }
    }
  };

  return (
    <>
      <div className="signUpBackground">
        <div className="contain-items">
          <img src={doctermy} className="doctermy" />
          <img src={steth} className="steth" />
          <img src={clock} className="clock" />
        </div>
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <img src={doclogo} className="logos" />
              <div className="auth-header">
                <h2>Hello! Welcome Back</h2>
              </div>
              {error && (
                <div className="error-container">
                  <MdErrorOutline className="error-icon" />
                  <p className="auth-error">{error}</p>
                </div>
              )}
              <div className="form-field">
                <label htmlFor="" className="labels">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                  className="inputs"
                />
                <label htmlFor="" className="labels">
                  Password
                </label>
                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="inputs"
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      className="eye"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <AiFillEye
                      className="eye"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                {/* <div className="auth-options">
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#" className="forgot">Forgot password?</a>
                </div> */}
                <button type="submit">Log In</button>
              </div>
              <p className="loginp">
                Don’t have an account? <a href="/signup">Create Account</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;

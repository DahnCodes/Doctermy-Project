// import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";
import steth from "../assets/Stethoscope.png";
import clock from "../assets/Clock.png";
import doctermy from "../assets/Inverselogo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import doclogo from "../assets/Doctermy.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/;
    const phonePattern = /^(?:\+?234|0)?[789]\d{9}$/;

    if (!passwordPattern.test(formData.password)) {
      return "Password must be minimum of 8 characters, should contain at least a capital letter, small letter, number and a symbol";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    if (!phonePattern.test(formData.phoneNumber)) {
      return "Phone number must contain 11 numbers";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = formData;

      await axios.post(
        "https://doctermy.onrender.com/api/v1/auth/signup",
        submitData
      );

      console.log("Data:", formData);
      navigate("/signin");
    } catch (err) {
      setError("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="signUpBackground">
        {loading && (
          <div className="loading">
            <AiOutlineLoading3Quarters className="loading-icon" />
          </div>
        )}
        <div className="contain-items">
          <img src={doctermy} className="doctermy" />
          <img src={steth} className="steth" />
          <img src={clock} className="clocks" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="form-containers">
              <img src={doclogo} className="logos" />
              <h4>Get started with Doctermy</h4>
              <p>Create your free account and get started</p>
              {error && (
                <div className="error-container">
                  <MdErrorOutline className="error-icon" />
                  <div className="error-message">{error}</div>
                </div>
              )}
              <div className="form-field">
                <label htmlFor="" className="labels">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                  onChange={handleChange}
                  required
                  className="inputs"
                />
                <label htmlFor="" className="labels">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  required
                  className="inputs"
                />
                <label htmlFor="" className="labels">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
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
                <label htmlFor="" className="labels">
                  Confirm Password
                </label>
                <div className="password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                    className="inputs"
                  />
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible
                      className="eye"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <AiFillEye
                      className="eye"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                  <p className="password-p">
                    Password must contain a symbol, number, capital & <br />
                    lowercase letters and a minimum of 8 characters
                  </p>
                </div>
                <button type="submit">Sign Up</button>
              </div>
              <p className="loginp">
                Already have an account? <a href="/signin">Log In</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;

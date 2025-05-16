import React, { useState } from "react";
import "./SignIn.css";

import robert from '../../../../src/assets/robert.png'
import user_icon from '../../../../src/assets/user_icon.png'
import mail_icon from '../../../../src/assets/mail_icon.png'
import key_icon from '../../../../src/assets/key_icon.png'
import google_icon from '../../../../src/assets/google_icon.png'
import facebook_icon from '../../../../src/assets/facebook_icon.png'

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Sign up submitted!");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo-row">
          <span>Expert Path</span>
        </div>
        <div className="register-title">Create an account</div>
        <div className="register-subtitle">Let's get started!</div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">
              <img src={user_icon} alt="Name" />
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">
              <img src={mail_icon} alt="E-mail" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">
              <img src={key_icon} alt="Password" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">
              <img src={key_icon} alt="Confirm Password" />
            </span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="terms-row">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              required
            />
            I Accept Terms & Conditions
          </div>
          <button className="signup-btn" type="submit">
            Sign up
          </button>
        </form>
        <div className="signin-row">
          Already have an account?
          <a href="/login">Sign in</a>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <button className="social-btn google">
          <img src={google_icon} alt="Google" />
          sign up with google
        </button>
        <button className="social-btn facebook">
          <img src={facebook_icon} alt="Facebook" />
          sign up with facebook
        </button>
      </div>
      <div className="right-panel">
        <img
          className="robot-img"
          src={robert}
          alt="Robot"
        />
        
      </div>
    </div>
  );
}

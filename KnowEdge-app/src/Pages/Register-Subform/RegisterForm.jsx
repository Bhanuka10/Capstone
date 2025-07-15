import React, { useState } from "react";
import "./RegisterForm.css";
import Register from '../../assets/Register.png'
import arrowdown from '../../assets/arrow-down.png'

import { useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function RegisterForm() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [form, setForm] = useState({
    fullname: "",
    age: "",
    gender: "",
    preferredLanguage: "",
    educationalQualification: "",
    educationLevel: "",
    skillLevel: "",
    fieldOfStudy: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        fullname: form.fullname,
        age: form.age,
        gender: form.gender,
        preferredLanguage: form.preferredLanguage,
        educationalQualification: form.educationalQualification,
        educationLevel: form.educationLevel,
        skillLevel: form.skillLevel,
        fieldOfStudy: form.fieldOfStudy,
        profileCompleted: true,
      });

      toast.success("✅ Profile completed!");
      setTimeout(() => navigate("/home"), 2500); // or your dashboard
    } catch (error) {
      toast.error(`❌ Failed to save data: ${error.message}`);
    }
  };


  return (
    <div className="register-bg">
      <div className="register-main">
        <div className="register-card">
          <div className="logo-row">
            <span>SKILL FORGE</span>
          </div>
          <div className="register-title">Complete your registration </div>
          {/* Form */}
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="input-block">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={form.fullname}
                onChange={handleChange}
                required
              />
            </div>
            {/* Age */}
            <div className="input-block">
              <input
                type="number"
                name="age"
                placeholder="Age"
                min="1"
                max="100"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>
            {/* Gender */}
            <div className="input-block radio-block">
              <label>Gender</label>
              <div className="radio-row">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Female
                </label>
              </div>
            </div>
            {/* Preferred Language */}
            <div className="input-block select-wrapper">
              <select
                name="preferredLanguage"
                value={form.preferredLanguage}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Preferred Language
                </option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="hindi">Hindi</option>
                <option value="chinese">Chinese</option>
                <option value="arabic">Arabic</option>
                <option value="other">Other</option>
              </select>
              <img src={arrowdown} alt="" className="select-icon" />
            </div>
            {/* Educational Qualification */}
            <div className="input-block">
              <input
                type="text"
                name="educationalQualification"
                placeholder="Educational Qualification"
                value={form.educationalQualification}
                onChange={handleChange}
                required
              />
            </div>
            {/* Highest Educational Level */}
            <div className="input-block select-wrapper">
              <select
                name="educationLevel"
                value={form.educationLevel}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Highest Educational Level
                </option>
                <option value="highschool">High School</option>
                <option value="associate">Associate Degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="doctorate">Doctorate</option>
                <option value="other">Other</option>
              </select>
              <img src={arrowdown} alt="" className="select-icon" />
            </div>
            {/* Skill Level */}
            <div className="input-block radio-block">
              <label>Skill Level</label>
              <div className="radio-row skill-row">
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value="beginner"
                    checked={form.skillLevel === "beginner"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Beginner
                </label>
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value="intermediate"
                    checked={form.skillLevel === "intermediate"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Intermediate
                </label>
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value="advanced"
                    checked={form.skillLevel === "advanced"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Advanced
                </label>
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value="expert"
                    checked={form.skillLevel === "expert"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Expert
                </label>
              </div>
            </div>
            {/* Field of Study / Interests */}
            <div className="input-block">
              <input
                type="text"
                name="fieldOfStudy"
                placeholder="Field of Study / Interests"
                value={form.fieldOfStudy}
                onChange={handleChange}
                required
              />
            </div>
            {/* Register Button */}
            <button className="register-btn" type="submit">
              Register
            </button>
          </form>
        </div>
        {/* Illustration */}
        <div className="register-illustration">
          {/* You can replace this with your SVG/PNG as needed */}
          <img
            src={Register}
            alt=""
            className="register-img"
          />
        </div>
      </div>
    </div>
  );
}

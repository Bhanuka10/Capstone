import React, { useState } from "react";
import "./Register.css";

import robert from '../../assets/robert.png'
import black_user_icon from '../../assets/black_user_icon.png'
import mail_icon from '../../assets/mail_icon.png'
import key_icon from '../../assets/key_icon.png'
import google_icon from '../../assets/google_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"; // adjust path as needed
import { doc, setDoc } from "firebase/firestore";

import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";


export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });

  const [alertMsg, setAlertMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, terms } = form;

        if (password !== confirmPassword) {
            toast.error("❌ Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                termsAccepted: terms,
                createdAt: new Date(),
            });

            toast.success("✅ Registration successful!");

            setTimeout(() => {
                navigate("/home");
            }, 2500);
        } catch (error) {
            toast.error(`❌ ${error.message}`);
        }
    };


    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Optional: Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                authProvider: "google",
                createdAt: new Date(),
            });

            toast.success("✅ Signed in with Google! Redirecting...");
            setTimeout(() => {
                navigate("/home");
            }, 2500);

        } catch (error) {
            console.error("Google Sign-In Error:", error);
            toast.error(`❌ Google sign-in failed: ${error.message}`);
        }
    };

    const handleFacebookSignIn = async () => {
        const provider = new FacebookAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Optional: Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                authProvider: "facebook",
                createdAt: new Date(),
            });

            toast.success("✅ Signed in with Facebook! Redirecting...");
            setTimeout(() => {
                navigate("/home");
            }, 2500);

        } catch (error) {
            console.error("Facebook Sign-In Error:", error);
            toast.error(`❌ Facebook sign-in failed: ${error.message}`);
        }
    };

    return (
        <div className="register-container">
            <div className="register-container">
                <div className="register-card">
                    <div className="logo-row">
                        <span>Expert Path</span>
                    </div>
                    <div className="register-title">Create an account</div>
                    <div className="register-subtitle">Let's get started!</div>
                    {alertMsg && (
                        <div className="alert-box">
                            {alertMsg}
                        </div>
                    )}

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="input-group">
            <span className="icon">
              <img src={black_user_icon} alt="Name" />
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
                    <button className="social-btn google" onClick={handleGoogleSignIn}>
                        <img src={google_icon} alt="Google" />
                        Sign up with Google
                    </button>

                    <button className="social-btn facebook" onClick={handleFacebookSignIn}>
                        <img src={facebook_icon} alt="Facebook" />
                        Sign up with Facebook
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

            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        </div>
    );
};
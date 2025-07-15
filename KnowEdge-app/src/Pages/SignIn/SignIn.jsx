import React, { useState } from "react";
import "./SignIn.css";

import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import robert from '../../assets/robert.png';
import black_user_icon from '../../assets/black_user_icon.png';
import key_icon from '../../assets/key_icon.png';
import google_icon from '../../assets/google_icon.png';
import facebook_icon from '../../assets/facebook_icon.png';

export default function SignIn() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

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
        const { email, password } = form;

        const adminEmail = "harishihan@outlook.com";
        const adminPassword = "123456789";

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ✅ Save last login date and time
            const now = new Date();
            const time = now.toLocaleTimeString();
            const date = now.toLocaleDateString();

            await setDoc(doc(db, "users", user.uid), {
                time,
                date,
            }, { merge: true });

            toast.success("✅ Signed in successfully!");

            setTimeout(() => {
                if (email === adminEmail && password === adminPassword) {
                    navigate("/dashboard");
                } else {
                    navigate("/home");
                }
            }, 2000);
        } catch (error) {
            toast.error(`❌ ${error.message}`);
        }
    };



    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const now = new Date();
            const time = now.toLocaleTimeString();
            const date = now.toLocaleDateString();

            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                authProvider: "google",
                time,
                date,
            }, { merge: true });

            toast.success("✅ Signed in with Google!");
            setTimeout(() => navigate("/home"), 2000);
        } catch (error) {
            toast.error(`❌ Google sign-in failed: ${error.message}`);
        }
    };


    const handleFacebookSignIn = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const now = new Date();
            const time = now.toLocaleTimeString();
            const date = now.toLocaleDateString();

            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                authProvider: "Facebook",
                time,
                date,
            }, { merge: true });

            toast.success("✅ Signed in with Facebook!");
            setTimeout(() => navigate("/home"), 2000);
        } catch (error) {
            toast.error(`❌ Facebook sign-in failed: ${error.message}`);
        }
    };


    return (
        <div className="register-container">
            <div className="register-card">
                <div className="logo-row"></div>
                <div style={{ marginBottom: 22 }}>
                    <div style={{ color: "#fff", fontSize: 16, fontWeight: 400 }}>Welcome to</div>
                    <div style={{ color: "#9ee493", fontWeight: 600, fontSize: 18, letterSpacing: 1 }}>SKILL FORGE</div>
                </div>
                <div className="register-subtitle">Let's get started!</div>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="icon"><img src={black_user_icon} alt="Email" /></span>
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <span className="icon"><img src={key_icon} alt="Password" /></span>
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    </div>

                    <div className="form-options">
                        <div className="checkbox-wrapper">
                            <input id="rememberMe" type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="#" className="forgot-link">Forgot Password?</a>
                    </div>

                    <button className="signup-btn" type="submit">Sign in</button>
                </form>

                <div className="signin-row">
                    Don't have an account? <Link to="/">Sign up</Link>
                </div>

                <div className="divider"><span>OR</span></div>

                <button className="social-btn google" onClick={handleGoogleSignIn}>
                    <img src={google_icon} alt="Google" /> Sign in with Google
                </button>
                <button className="social-btn facebook" onClick={handleFacebookSignIn}>
                    <img src={facebook_icon} alt="Facebook" /> Sign in with Facebook
                </button>
            </div>

            <div className="right-panel">
                <img className="robot-img" src={robert} alt="Robot" />
            </div>

            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        </div>
    );
}





















// import React, { useState } from "react";
// import "./SignIn.css";
//
// import robert from '../../assets/robert.png'
// import user_icon from '../../assets/user_icon.png'
// import mail_icon from '../../assets/mail_icon.png'
// import key_icon from '../../assets/key_icon.png'
// import google_icon from '../../assets/google_icon.png'
// import facebook_icon from '../../assets/facebook_icon.png'
//
// export default function SignIn() {
//
//   return (
//
//     <div className="register-container">
//       <div className="register-card">
//         <div className="logo-row">
//           {/* <span>Expert Path</span> */}
//         </div>
//         {/* <div className="register-title">WelCome</div>
//         <div className="register-subtitle">Let's get started!</div> */}
//
//
// <div style={{ marginBottom: 22 }}>
//             <div style={{ color: "#fff", fontSize: 16, fontWeight: 400 }}>
//               Welcome to
//             </div>
//             <div style={{ color: "#9ee493", fontWeight: 600, fontSize: 18, letterSpacing: 1 }}>
//               Expert Path
//             </div>
//           </div>
//
//           <div className="register-subtitle">Let's get started!</div>
//
//
//         <form className="register-form" onSubmit={handleSubmit}>
//           <div className="input-group">
//             <span className="icon">
//               <img src={user_icon} alt="Name" />
//             </span>
//             <input
//               type="text"
//               name="name"
//               placeholder="Email"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <span className="icon">
//               {/* <img src={mail_icon} alt="E-mail" /> */}
//             </span>
//             {/* <input
//               type="email"
//               name="email"
//               placeholder="E-mail"
//               value={form.email}
//               onChange={handleChange}
//               required
//             /> */}
//           </div>
//           <div className="input-group">
//             <span className="icon">
//               <img src={key_icon} alt="Password" />
//             </span>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <span className="icon">
//               {/* <img src={key_icon} alt="Confirm Password" /> */}
//             </span>
//             {/* <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               required
//             /> */}
//           </div>
//           {/* <div className="terms-row">
//             <input
//               type="checkbox"
//               name="terms"
//               checked={form.terms}
//               onChange={handleChange}
//               required
//             />
//             Remember me
//           </div> */}
//
//
// <div className="form-options">
//   <div className="checkbox-wrapper">
//     <input
//       id="rememberMe"
//       type="checkbox"
//       name="terms"
//       checked={form.terms}
//       onChange={handleChange}
//       required
//     />
//     <label htmlFor="rememberMe">Remember me</label>
//   </div>
//   <a href="#" className="forgot-link">Forgot Password?</a>
// </div>
//
//
//
//
//
//
//
//
// {/*
// <a href="#" style={{ color: "#b9e3e7", fontSize: 13, textDecoration: "none" }}>
//                 Forget Password ?
// </a> */}
//
//
//
//
//
//
//
//
//
//           <button className="signup-btn" type="submit">
//             Sign in
//           </button>
//         </form>
//         <div className="signin-row">
//           Don't have an account?
//           <a href="/login">Sign up</a>
//         </div>
//         <div className="divider">
//           <span>OR</span>
//         </div>
//         <button className="social-btn google">
//           <img src={google_icon} alt="Google" />
//           sign up with google
//         </button>
//         <button className="social-btn facebook">
//           <img src={facebook_icon} alt="Facebook" />
//           sign up with facebook
//         </button>
//       </div>
//       <div className="right-panel">
//         <img
//           className="robot-img"
//           src={robert}
//           alt="Robot"
//         />
//
//       </div>
//     </div>
//   );
// }

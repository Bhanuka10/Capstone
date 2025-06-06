import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import './ForgotPassword.css';
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent. Please check your inbox.');
        } catch (error) {
            console.error("Error sending password reset email:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <h2>Forgot Password?</h2>
                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleResetPassword}>Reset Password</button>
                <div className="back-to-login">

                    <p>
                        Remembered your password?
                        <Link to="/signin" className="login">login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

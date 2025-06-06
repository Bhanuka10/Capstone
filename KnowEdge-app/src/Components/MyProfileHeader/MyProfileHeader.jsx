import React, { useEffect, useState } from 'react';
import './MyProfileHeader.css';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase';

const MyProfileHeader = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.uid;
                try {
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.log("User not authenticated");
            }
            setLoading(false);
        });

        return () => unsubscribe(); // cleanup
    }, []);

    const handleScrollToChatBot = () => {
        const chatBotElement = document.querySelector('.cha');
        if (chatBotElement) {
            chatBotElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='profile-container'>
            {/*SKILLFORGE box*/}
            <div className='skillfordge-box'>
                <div className='text-section'>
                    <h2 className='title'>SKILL FORGE</h2>
                    <p className='subtitle'>Sharpen your knowledge with AI-powered guidance for a smarter learning journey</p>
                    <div className='chatbot-button-wrapper'>
                        <button className='chatbot-button' onClick={handleScrollToChatBot}>Use Chatbot</button>
                    </div>
                </div>
                <div className='image-section'>
                    <img src="pngtree-3d-bot-ai-powered-marketing-and-notification-tools-png-image_9187783.png" alt='AI Bot' className='robot-image' />
                </div>
            </div>

            {/*user profile box*/}
            <div className='profile-box'>
                <img src={userData?.avatarURL} alt="User Avatar" />
                <h3 className='username'>Hello {userData?.fullname || "User"}!</h3>
                <div className='content'>
                    <p><strong>Age:</strong> {userData?.age}</p>
                    <p><strong>Gender:</strong> {userData?.gender}</p>
                    <p><strong>Preferred Language:</strong> {userData?.preferredLanguage}</p>
                    <p><strong>Education Level:</strong> {userData?.educationLevel}</p>
                    <p><strong>Qualification:</strong> {userData?.educationalQualification}</p>
                    <p><strong>Field of Study:</strong> {userData?.fieldOfStudy}</p>
                    <p><strong>Skill Level:</strong> {userData?.skillLevel}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfileHeader;

import React, { useEffect, useState } from 'react'
import './MyProfileHeader.css'
import userimage from '../../Images/Maria.jpg'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
// If you're using Firebase Auth:
import { getAuth } from 'firebase/auth'

const MyProfileHeader = () => {
    const [userData, setUserData] = useState(null)

    // Get the logged-in user's UID
    const auth = getAuth()
    const user = auth.currentUser
    const userId = user?.uid || "demo-user-id" // fallback if not logged in

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", userId)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setUserData(docSnap.data())
                } else {
                    console.log("No such document!")
                }
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }

        if (userId) {
            fetchUserData()
        }
    }, [userId])

    return (
        <div className='profile-container'>
            {/*SKILLFORGE box*/}
            <div className='skillfordge-box'>
                <div className='text-section'>
                    <h2 className='title'>SKILL FORGE</h2>
                    <p className='subtitle'>Sharpen your knowledge with AI-powered guidance for a smarter learning journey</p>
                    <div className='chatbot-button-wrapper'>
                        <button className='chatbot-button'>Use Chatbot</button>
                    </div>
                </div>
                <div className='image-section'>
                    <img src="pngtree-3d-bot-ai-powered-marketing-and-notification-tools-png-image_9187783.png" alt='AI Bot' className='robot-image' />
                </div>
            </div>

            {/*user profile box*/}
            <div className='profile-box'>
                <img src={userimage} alt='User' className='profile-image' />
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
    )
}

export default MyProfileHeader

import React, { useState, useEffect } from "react";
import "./feedback.css";
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

const Feedback = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [profileImage, setProfileImage] = useState(null); // avatarURL from Firestore

  const user = auth.currentUser;
  const userId = user?.uid;

  // 🔁 Fetch user profile data from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileImage(data.avatarURL || null); // Use default avatar if needed
            setName(data.fullname || "Anonymous");
          }
        } catch (error) {
          console.error("Error fetching user profile for feedback:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not authenticated.");
      return;
    }

    try {
      await addDoc(collection(db, "feedback"), {
        name,
        text: comment,
        image: profileImage,
        timestamp: serverTimestamp(),
      });
      alert("Feedback saved successfully!");
      setName("");
      setComment("");
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback.");
    }
  };

  return (
      <div className="feedback-container">
        <h2 className="feedback-title">Leave a Comment</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div>
            <label htmlFor="comment" className="feedback-label">Comment</label>
            <textarea
                id="comment"
                rows="4"
                className="feedback-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
            ></textarea>
          </div>

          <button type="submit" className="feedback-button">Post Comment</button>
        </form>

        <h2 className="feedback-title">User Feedback</h2>
        <div className="feedback-scroll-wrapper">
          <div className="feedback-scroll">
            {/* Example feedback items */}
            <div className="feedback-item">Great app! - User A</div>
            <div className="feedback-item">Very helpful! - User B</div>
            <div className="feedback-item">Loved the UI! - User C</div>
            {/* Add more feedback dynamically */}
          </div>
        </div>

        <h2 className="feedback-title">Comments Section</h2>
        <div className="comment-scroll-wrapper">
          <div className="comment-scroll">
            {/* Example comments */}
            <div className="comment-item">This is a great feature! - User X</div>
            <div className="comment-item">I love the design! - User Y</div>
            <div className="comment-item">Very intuitive! - User Z</div>
            {/* Add more comments dynamically */}
          </div>
        </div>
      </div>
  );
};

export default Feedback;

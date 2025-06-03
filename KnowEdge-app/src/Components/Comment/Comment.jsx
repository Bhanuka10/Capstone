import React, { useEffect, useState } from 'react';
import './Comment.css';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

const Comment = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedback = querySnapshot.docs.map((doc) => doc.data());
        setFeedbackData(feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className='comment'>
      <div className='banner'><h1>Feedback</h1></div>
      <div className='scroll-container'>
        {feedbackData.map((feedback, index) => (
          <div className='comment-first-box' key={index}>
            <div className='id'>
              <img src={feedback.image} alt={feedback.name} />
              <h2>{feedback.name}</h2>
            </div>
            <div className='comment-text'>
              <p>"{feedback.text}"</p>
            </div>
          </div>
        ))}
      </div>
      <div className='after-scroll'></div>
    </div>
  );
};

export default Comment;
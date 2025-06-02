import React, { useState } from "react";
import "./feedback.css"; // Make sure the path is correct!

const Feedback = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, comment, image });
    setName("");
    setComment("");
    setImage(null);
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Leave a Comment</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div>
          <label htmlFor="name" className="feedback-label">Name</label>
          <input
            type="text"
            id="name"
            className="feedback-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
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
        <div>
          <label htmlFor="image" className="feedback-label">Add an profile photo (optional)</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="feedback-file"
            onChange={handleImageChange}
          />
          {image && (
            <img src={image} alt="Preview" className="feedback-image-preview" />
          )}
        </div>
        <button type="submit" className="feedback-button">Post Comment</button>
      </form>
    </div>
  );
};

export default Feedback;

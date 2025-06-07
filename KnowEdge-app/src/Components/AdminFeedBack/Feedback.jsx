import React, { useEffect, useState } from 'react';
import './FeedBack.css';
import SideBar from '../AdminSideBar/SideBar';
import { db } from '../../firebase'; // adjust path as needed
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import {Link, useNavigate} from "react-router-dom";

const Feedback = () => {
    const [activeMenu, setActiveMenu] = useState('feedback');
    const [feedbackList, setFeedbackList] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Fetch feedback from Firestore
    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const feedbackRef = collection(db, 'feedback');
                const q = query(feedbackRef, orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);

                const feedbacks = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setFeedbackList(feedbacks);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetchFeedback();
    }, []);

    const handleViewToggle = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this feedback?");
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, 'feedback', id));
            setFeedbackList(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("Failed to delete feedback.");
        }
    };


    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            const term = searchTerm.toLowerCase().trim();

            if (term.includes('dashboard')) {
                navigate('/dashboard');
            } else if (term.includes('course')) {
                navigate('/add-course');
            } else if (term.includes('feedback')) {
                navigate('/feedback');
            } else {
                alert('Page not found');
            }

            setSearchTerm(''); // optional: clear the search
        }
    }

    return (
        <div className="admin-feedback-container">
            <SideBar activeMenu={activeMenu} onMenuClick={setActiveMenu} />
            <div className="main-content">
                <div className="top-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                    <Link to="/signin" className="logout-link">
                        Logout
                    </Link>
                </div>

                <div className="feedback-section">
                    <div className="feedback-table">
                        <div className="feedback-table-header">
                            <div className="cell image-cell">Avatar</div>
                            <div className="cell name-cell">Name</div>
                            <div className="cell message-cell">Message</div>
                            <div className="cell action-cell">Actions</div>
                        </div>

                        {feedbackList.length === 0 && (
                            <p style={{ padding: '10px' }}>No feedback available.</p>
                        )}

                        {feedbackList.map((item, index) => (
                            <div className="feedback-table-row" key={item.id}>
                                <div className="cell image-cell">
                                    <img
                                        src={item.image || '/default-avatar.png'}
                                        alt="avatar"
                                        className="feedback-avatar"
                                    />
                                </div>
                                <div className="cell name-cell">{item.name}</div>
                                <div className={`cell message-cell ${expandedIndex === index ? 'expanded' : 'collapsed'}`}>
                                    {item.text}
                                </div>
                                <div className="cell action-cell">
                                    <button className="view-btn" onClick={() => handleViewToggle(index)}>
                                        {expandedIndex === index ? '←' : 'View'}
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;

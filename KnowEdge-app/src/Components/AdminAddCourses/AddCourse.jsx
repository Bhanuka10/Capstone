import React, { useEffect, useState } from 'react';
import './AddCourse.css';
import SideBar from "@/Components/AdminSideBar/SideBar.jsx";
import { db } from '@/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const CoursesDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('courses');
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [courseType, setCourseType] = useState('free'); // "free" or "paid"
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [recentCourses, setRecentCourses] = useState([]);

    useEffect(() => {
        document.body.style.margin = '0';
        fetchRecentCourses();
        return () => {
            document.body.style.margin = '';
        };
    }, []);

    const fetchRecentCourses = async () => {
        try {
            const courseRef = collection(db, 'courses');
            const q = query(courseRef, orderBy('createdAt', 'desc'), limit(5));
            const snapshot = await getDocs(q);
            const courseList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRecentCourses(courseList);
        } catch (error) {
            console.error('Error fetching recent courses:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await addDoc(collection(db, 'courses'), {
                title,
                videoUrl,
                courseType,
                createdAt: new Date()
            });

            setMessage('Course added successfully!');
            setTitle('');
            setVideoUrl('');
            setCourseType('free');
            fetchRecentCourses(); // Refresh the list
        } catch (error) {
            console.error('Error adding course:', error);
            setMessage('Failed to add course.');
        }

        setLoading(false);
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
        <div className="course-container">
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

                {/* ✅ Recent Courses Display */}
                <div className="recent-courses-section">
                    <h2>Recent Courses</h2>
                    <div className="user-table">
                        <div className="table-header">
                            <span>Title</span>
                            <span>Video URL</span>
                            <span>Type</span>
                        </div>
                        {recentCourses.map((course) => (
                            <div className="table-row" key={course.id}>
                                <span>{course.title}</span>
                                <span>{course.videoUrl}</span>
                                <span style={{ color: course.courseType === 'free' ? 'green' : 'blue' }}>
                                    {course.courseType}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ Add New Course Form */}
                <div className="courses-section">
                    <h2>Add a New Course</h2>
                    <form onSubmit={handleSubmit} className="course-form">
                        <label>Course Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter course title"
                            required
                        />

                        <label>Video URL / Thumbnail:</label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Enter video URL or thumbnail"
                            required
                        />

                        <label>Course Type:</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    value="free"
                                    checked={courseType === 'free'}
                                    onChange={(e) => setCourseType(e.target.value)}
                                />
                                Free
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="paid"
                                    checked={courseType === 'paid'}
                                    onChange={(e) => setCourseType(e.target.value)}
                                />
                                Paid
                            </label>
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Course'}
                        </button>

                        {message && <p className="status-message">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CoursesDashboard;

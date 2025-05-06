import React, { useState } from 'react';
import './AddCourse.css';
import SideBar from "@/Components/AdminSideBar/SideBar.jsx";

const CoursesDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('courses'); // ✅ Added this

    const courses = Array(8).fill({
        title: "Web Development full course",
        field: "IT",
        link: "ABC,youtube.com",
        views: 56,
    });

    return (
        <div className="dashboard-container">
            <SideBar activeMenu={activeMenu} onMenuClick={setActiveMenu} />

            <div className="main-content">
                <div className="top-bar">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <div className="profile">Admin</div>
                </div>
                <div className="courses-section">
                    <h2>All Courses</h2>
                    <div className="table">
                        <div className="table-header">
                            <span>Course</span>
                            <span>Field</span>
                            <span>Link</span>
                            <span>No. of Views</span>
                            <span>Actions</span>
                        </div>
                        {courses.map((course, index) => (
                            <div className="table-row" key={index}>
                                <span>{course.title}</span>
                                <span>{course.field}</span>
                                <span>{course.link}</span>
                                <span>{course.views}</span>
                                <span className="actions">
                                    <button className="edit">Edit</button>
                                    <button className="delete">🗑️</button>
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="add-course">Add Course</button>
                </div>
            </div>
        </div>
    );
};

export default CoursesDashboard;



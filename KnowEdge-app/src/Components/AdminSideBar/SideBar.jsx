import React from 'react';
import './SideBar.css';
import { MdDashboard } from "react-icons/md";
import { FaBook, FaComments, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = ({ activeMenu, onMenuClick }) => {
    return (
        <div className="sidebar">
            <div className="logo">Expert Path</div>
            <div className="menu">
                <Link
                    to="/"
                    className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                    onClick={() => onMenuClick('dashboard')}
                >
                    <MdDashboard /> Dashboard
                </Link>

                <Link
                    to="/user-details"
                    className={`menu-item ${activeMenu === 'users' ? 'active' : ''}`}
                    onClick={() => onMenuClick('users')}
                >
                    <FaUsers /> Users
                </Link>

                <Link
                    to="/add-course"
                    className={`menu-item ${activeMenu === 'courses' ? 'active' : ''}`}
                    onClick={() => onMenuClick('courses')}
                >
                    <FaBook /> Courses
                </Link>

                <Link
                    to="/feedback"
                    className={`menu-item ${activeMenu === 'feedback' ? 'active' : ''}`}
                    onClick={() => onMenuClick('feedback')}
                >
                    <FaComments /> Feedback
                </Link>
            </div>
        </div>
    );
};

export default SideBar;

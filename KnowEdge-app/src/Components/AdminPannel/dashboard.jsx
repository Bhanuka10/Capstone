import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './dashboard.css';
import { FaHome } from "react-icons/fa";

import { FaUser, FaBook, FaTrashAlt } from 'react-icons/fa';
import SideBar from '../AdminSideBar/SideBar';
import { db } from "@/firebase";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    limit
} from "firebase/firestore";

const handleLogout = () => {
    console.log("Logging out...");
    // Example: clear auth token
    localStorage.removeItem('token'); // or sessionStorage.removeItem()
    setShowDropdown(false);
    navigate('/signin'); // redirect to signin page
};

const Dashboard = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const fetchUsers = async () => {
        try {
            const usersCollection = collection(db, "users");
            const snapshot = await getDocs(usersCollection);
            const userList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const courseCollection = collection(db, "courses");
            const q = query(courseCollection, orderBy("createdAt", "desc"), limit(5));
            const snapshot = await getDocs(q);
            const courseList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCourses(courseList);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, "users", userId));
            setUsers(prev => prev.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        const previousMargin = document.body.style.margin;
        document.body.style.margin = '0';
        fetchUsers();
        fetchCourses();
        return () => {
            document.body.style.margin = previousMargin;
        };
    }, []);

    return (
        <div className="dashboard-container">
            <SideBar activeMenu={activeMenu} onMenuClick={handleMenuClick} />

            <div className="main-content">
                <div className="top-bar">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <Link to="/signin" className="logout-link">
                        Logout
                    </Link>

                </div>


                <div className="stats-cards">
                    <h1 className="admin-title">Dashboard</h1>
                    <div className="card">
                        <div className="card-info">
                            <p>Total Users</p>
                            <FaUser />
                        </div>
                        <h2>{users.length}</h2>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <p>Total Courses</p>
                            <FaBook />
                        </div>
                        <h2>{courses.length}</h2>
                    </div>
                </div>

                {/* 👇 User Email Table */}
                <div className="admin-user-section">
                    <h2>All Users</h2>
                    <div className="user-table">
                        <div className="table-header">
                            <span>Email</span>
                            <span>Name</span>
                            <span>Last Logged in</span>
                            <span></span>
                        </div>
                        {users.map((user) => (
                            <div className="table-row" key={user.id}>
                                <span>{user.email}</span>
                                <span>{user.name}</span>
                                <span>{user.time} &nbsp; {user.date}</span>
                                <span>
                                    <FaTrashAlt
                                        className="delete-icon"
                                        onClick={() => deleteUser(user.id)}
                                        title="Delete user"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 👇 Course List Table */}
                <div className="admin-user-section">
                    <h2>Recent Courses</h2>
                    <div className="user-table">
                        <div className="table-header">
                            <span>Title</span>
                            <span>Video URL</span>
                            <span>Type</span>
                        </div>
                        {courses.map((course) => (
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

            </div>
        </div>
    );
};

export default Dashboard;

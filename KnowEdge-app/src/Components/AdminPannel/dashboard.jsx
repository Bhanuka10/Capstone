import React, { useState, useEffect } from 'react';
import './dashboard.css';
import AddCourse from "../AdminAddCourses/AddCourse";
import { FaUser, FaBook, FaUsers, FaComments } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SideBar from '../AdminSideBar/SideBar';

const Dashboard = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    // ✅ Remove body margin only for this page
    useEffect(() => {
        const previousMargin = document.body.style.margin;
        document.body.style.margin = '0';

        return () => {
            document.body.style.margin = previousMargin;
        };
    }, []);

    return (
        <div className="dashboard-container">
            <SideBar activeMenu={activeMenu} onMenuClick={setActiveMenu} />

            <div className="main-content">
                <div className="top-bar">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <div className="admin-profile">Admin</div>
                </div>

                <div className="stats-cards">
                    <h1 className="admin-title">Dashboard</h1>
                    <div className="card">
                        <div className="card-info">
                            <p>Total Users</p>
                            <FaUser />
                        </div>
                        <h2>1544</h2>
                    </div>

                    <div className="card">
                        <div className="card-info">
                            <p>Total Courses</p>
                            <FaBook />
                        </div>
                        <h2>24</h2>
                    </div>
                </div>

                <div className="lower-section">
                    <div className="field-overview">
                        <h3>Field Overview</h3>
                        <div className="inner-box">
                            <div className="pie-chart">Chart</div>
                            <div className="legend">
                                <div><span className="legend-color it"></span> IT</div>
                                <div><span className="legend-color business"></span> Business</div>
                            </div>
                        </div>
                    </div>

                    <div className="trending-courses">
                        <h3>Trending Courses</h3>
                        <div className="inner-box">
                            <table>
                                <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Field</th>
                                    <th>No. of Enrollments</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Array.from({ length: 8 }).map((_, idx) => (
                                    <tr key={idx}>
                                        <td>Web Development full course</td>
                                        <td>IT</td>
                                        <td><center>56</center></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

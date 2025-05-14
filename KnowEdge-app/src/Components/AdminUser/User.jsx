
import React, {useEffect, useState} from 'react';
import './User.css';
import { FaUser, FaChalkboardTeacher, FaComments, FaTachometerAlt, FaTrashAlt } from 'react-icons/fa';
import SideBar from "@/Components/AdminSideBar/SideBar.jsx";

const UserDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('users');
    const users = Array(8).fill({
        email: 'abc@example.com',
        name: 'ABC',
        time: '10.00 AM',
        date: '06.05.2025'
    });

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

            <main className="main-content">
                <div className="top-bar">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <div className="admin-profile">
                        {/*<img src="https://via.placeholder.com/40" alt="" className="admin-img" />*/}
                        <span>Admin</span>
                    </div>
                </div>

                <div className="admin-user-section">
                    <h2 >All Users</h2>
                    <div className="user-table">
                        <div className="table-header">
                            <span>Email</span>
                            <span>Name</span>
                            <span>Last Logged in</span>
                            <span></span>
                        </div>
                        {users.map((user, index) => (
                            <div className="table-row" key={index}>
                                <span>{user.email}</span>
                                <span>{user.name}</span>
                                <span>{user.time} &nbsp; {user.date}</span>
                                <span><FaTrashAlt className="delete-icon" /></span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;

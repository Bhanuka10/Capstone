import React, { useEffect, useState } from 'react';
import './User.css';
import { FaTrashAlt } from 'react-icons/fa';
import SideBar from "@/Components/AdminSideBar/SideBar.jsx";
import { db } from "@/firebase"; // <-- your firebase config file
import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";

const UserDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('users');
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const usersCollection = collection(db, "users"); // assuming your users are in a collection named 'users'
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
        fetchUsers(); // fetch users when component mounts
        return () => {
            document.body.style.margin = previousMargin;
        };
    }, []);

    return (
        <div className="user-container">
            <SideBar activeMenu={activeMenu} onMenuClick={setActiveMenu} />
            <main className="main-content">
                <div className="top-bar">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <div className="admin-profile">
                        <span>Admin</span>
                    </div>
                </div>

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
            </main>
        </div>
    );
};

export default UserDashboard;

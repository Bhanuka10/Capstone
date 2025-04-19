import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    const [menu, setMenu] = useState('menu');

    const handleScroll = (sectionId) => {
        setMenu(sectionId);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='navbar'>
            <div className='first'>
                <div className='logo'>
                    <img src="DALL·E 2025-03-07 23.02.25 - A modern, sleek logo design combining the letters K and E in an elegant and creative way. The design should focus on a clean, minimalistic aesthetic w.png" alt="" />
                </div>
                <div className='search'>
                    <p>Search for courses</p>
                    <div className='search-icon'><FaSearch /></div>
                </div>
                <div className='menu'>
                    <ul>
                        <li className={menu === "Home" ? "active" : ""} onClick={() => handleScroll("Home")}>Home</li>
                        <li className={menu === "About" ? "active" : ""} onClick={() => handleScroll("About")}>About</li>
                        <li className={menu === "Contact" ? "active" : ""} onClick={() => handleScroll("Contact")}>Contact</li>
                    </ul>
                </div>
            </div>
            <div className='second'>
                <div className='login-btn'>
                    <button>Sign in</button>
                </div>
                <div className='user-logo'>
                    <img src="av3cbfdc7ee86dab9a41d.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
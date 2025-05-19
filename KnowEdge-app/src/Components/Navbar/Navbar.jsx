import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Import Link for navigation

const Navbar = () => {
    const [menu, setMenu] = useState('menu');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            const mockData = [
                'Web Development',
                'Data Science',
                'Artificial Intelligence',
                'Game Development',
                'Mobile Development',
                'Technology',
            ];
            const results = mockData.filter((item) =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleScrollToAbout = () => {
        setMenu("About");
        const aboutSection = document.getElementById("About");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='navbar'>
            <div className='first'>
                <div className='logo'>
                    <img src="DALL·E 2025-03-07 23.02.25 - A modern, sleek logo design combining the letters K and E in an elegant and creative way. The design should focus on a clean, minimalistic aesthetic w.png" alt="" />
                </div>
                <div className='search'>
                    <input
                        type="text"
                        placeholder="Search for courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className='search-button'>
                        <button className='search-icon' onClick={handleSearch}>
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <div className='menu'>
                    <ul>
                        <li className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className={menu === "About" ? "active" : ""} onClick={handleScrollToAbout}>
                            About
                        </li>
                        <li className={menu === "Contact" ? "active" : ""} onClick={() => setMenu("Contact")}>
                            <Link to="/contact">Contact</Link>
                        </li>
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
            {searchResults.length > 0 && (
                <div className='search-results'>
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
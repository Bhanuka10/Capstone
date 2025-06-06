import { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; // <-- add useNavigate
import { fetchPlaylistVideos, detectCategory } from '../../Utils/apiUtils'; // <-- import your API functions

const Navbar = () => {
    const [menu, setMenu] = useState('menu');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // <-- initialize useNavigate

    const handleSearch = async () => {
        if (searchQuery.trim() !== '') {
            const filterKeywords = searchQuery.toLowerCase().split(' ');
            const category = detectCategory(searchQuery); // Detect category based on search query

            if (category) {
                const videos = await fetchPlaylistVideos(category, filterKeywords);

                if (videos.length > 0) {
                    setSearchResults(videos.map(video => ({
                        title: video.title,
                        url: video.url
                    })));
                } else {
                    setSearchResults([{ title: `No videos found for "${searchQuery}".`, url: '#' }]);
                }
            } else {
                setSearchResults([{ title: `No relevant category detected for "${searchQuery}".`, url: '#' }]);
            }
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

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        // Example: clear auth token
        localStorage.removeItem('token'); // or sessionStorage.removeItem()
        setShowDropdown(false);
        navigate('/signin'); // redirect to signin page
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='navbar'>
            <div className='first'>
                <div className='logo'>
                    <img src="DALL·E 2025-03-07 23.02.25 - A modern, sleek logo design combining the letters K and E in an elegant and creative way. The design should focus on a clean, minimalistic aesthetic w.png" alt="Logo" />
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
                            <Link to="/contact">Profile</Link>
                        </li>
                        <li className={menu === "Content" ? "active" : ""} onClick={() => setMenu("Content")}>
                            <Link to="/Content">Content</Link>
                        </li>

                    </ul>
                </div>
            </div>
            <div className='second'>
                <div className='user-logo' onClick={toggleDropdown} ref={dropdownRef}>
                    <img src="av3cbfdc7ee86dab9a41d.png" alt="User" />
                    {showDropdown && (
                        <div className="user-dropdown">
                            <ul>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

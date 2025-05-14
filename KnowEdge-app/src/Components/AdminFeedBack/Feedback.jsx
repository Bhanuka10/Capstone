import React, {useEffect, useState} from 'react';
import './Feedback.css';
import SideBar from '../AdminSideBar/SideBar';

const feedbackData = [
    {
        email: 'abc@example.com',
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum, enim ac commodo placerat, odio enim pellentesque nisi, a congue tellus purus at ante. Integer nec efficitur mi, id interdum turpis. Etiam sagittis risus non.',
    },
    ...Array(9).fill({
        email: 'abc@example.com',
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum, enim ac commodo placerat, odio enim.',
    }),
];

const Feedback = () => {
    const [activeMenu, setActiveMenu] = useState('feedback');
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleViewToggle = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

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

                <div className="feedback-section">
                    <h2>Feedback</h2>
                    <div className="feedback-table">
                        <div className="feedback-table-header">
                            <div className="cell email-cell">Email</div>
                            <div className="cell message-cell">Message</div>
                            <div className="cell action-cell"></div>
                        </div>

                        {feedbackData.map((item, index) => (
                            <div className="feedback-table-row" key={index}>
                                <div className="cell email-cell">{item.email}</div>
                                <div className={`cell message-cell ${expandedIndex === index ? 'expanded' : 'collapsed'}`}>
                                    {item.message}
                                </div>
                                <div className="cell action-cell">
                                    <button className="view-btn" onClick={() => handleViewToggle(index)}>
                                        {expandedIndex === index ? '←' : 'View'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;

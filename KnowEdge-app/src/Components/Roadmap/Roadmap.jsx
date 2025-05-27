import React, { useEffect, useState, useRef } from 'react';
import "./Roadmap.css";
import { auth, db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

const Roadmap = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            const user = auth.currentUser;
            if (!user) {
                setRoadmaps([{ text: "Please log in to view your roadmaps." }]);
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "users", user.email, "roadmaps"),
                    orderBy("timestamp", "desc")
                );

                const querySnapshot = await getDocs(q);
                const fetchedRoadmaps = [];

                querySnapshot.forEach((doc) => {
                    fetchedRoadmaps.push({
                        id: doc.id,
                        text: doc.data().text,
                        timestamp: doc.data().timestamp?.toDate().toLocaleString(),
                    });
                });

                if (fetchedRoadmaps.length === 0) {
                    setRoadmaps([{ text: "No roadmaps found." }]);
                } else {
                    setRoadmaps(fetchedRoadmaps);
                }
            } catch (error) {
                console.error("Error fetching roadmaps:", error);
                setRoadmaps([{ text: "Failed to load roadmaps." }]);
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmaps();
    }, []);

    const renderMarkdown = (text) => {
        const counterRef = { current: 0 };

        return (
            <ReactMarkdown
                components={{
                    a: ({ href, children }) => {
                        const isYouTubeLink = href.includes("youtube.com/watch?v=");
                        if (isYouTubeLink) {
                            counterRef.current += 1;
                            const stepNumber = counterRef.current;

                            const videoId = new URL(href).searchParams.get("v");
                            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                            const cleanedTitle = String(children).replace(/^([#\d\.\)\s]+)/, "").trim();

                            return (
                                <div className="youtube-video" key={videoId}>
                                    <div className="step-number">{stepNumber}</div>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="youtube-link"
                                    >
                                        <img src={thumbnailUrl} alt={cleanedTitle} className="youtube-thumb" />
                                        <p className="youtube-title">{cleanedTitle}</p>
                                    </a>
                                </div>
                            );
                        }

                        return (
                            <a href={href} target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        );
                    },
                    li: ({ children }) => <div>{children}</div>,
                }}
            >
                {text}
            </ReactMarkdown>
        );
    };

    return (
        <div className="roadmap-container">
            <div className="roadmap-card">
                <h2 className="roadmap-title">🎯 Your Saved AI Roadmaps</h2>
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    roadmaps.map((rm, index) => (
                        <div key={index} className="roadmap-item">
                            {rm.timestamp && <p className="timestamp">🕒 {rm.timestamp}</p>}
                            <div className="roadmap-content">
                                {renderMarkdown(rm.text)}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Roadmap;















// import React, { useState } from 'react';
// import "./Roadmap.css";
//
// const Roadmap = () => {
//
//   return (
//     <div>
//       <div className='roadmap'>
//
//       </div>
//     </div>
//   );
// };
//
// export default Roadmap;
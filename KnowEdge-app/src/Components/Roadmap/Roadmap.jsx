import React, { useEffect, useState, useRef } from 'react';
import "./Roadmap.css";
import { auth, db } from '../../firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc, setDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const Roadmap = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleRemoveRoadmap = async (id) => {
        try {
            await deleteDoc(doc(db, "users", auth.currentUser.email, "roadmaps", id));
            setRoadmaps((prev) => prev.filter((rm) => rm.id !== id));
            alert("Roadmap removed successfully.");
        } catch (error) {
            console.error("Error removing roadmap:", error);
            alert("Failed to remove roadmap.");
        }
    };

    const handleVideoWatched = async (videoId) => {
        const videoElement = document.querySelector(`.youtube-video[data-video-id='${videoId}']`);
        if (videoElement) {
            videoElement.classList.add('watched');
        }

        try {
            const user = auth.currentUser;
            if (!user) {
                console.error("User not authenticated.");
                return;
            }

            const email = user.email;
            const watchedVideosRef = doc(db, "users", email, "watchedVideos", videoId);
            await setDoc(watchedVideosRef, { watched: true });
        } catch (error) {
            console.error("Error saving watched video to database:", error);
        }
    };

    useEffect(() => {
        const fetchWatchedVideos = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error("User not authenticated.");
                    return;
                }

                const email = user.email;
                const watchedVideosSnapshot = await getDocs(collection(db, "users", email, "watchedVideos"));
                const watchedVideos = {};

                watchedVideosSnapshot.forEach((doc) => {
                    watchedVideos[doc.id] = doc.data().watched;
                });

                document.querySelectorAll('.youtube-video').forEach((videoElement) => {
                    const videoId = videoElement.getAttribute('data-video-id');
                    if (watchedVideos[videoId]) {
                        videoElement.classList.add('watched');
                    }
                });
            } catch (error) {
                console.error("Error fetching watched videos from database:", error);
            }
        };

        fetchWatchedVideos();
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
                                <div className="youtube-video" data-video-id={videoId}>
                                    <div className="step-number">{stepNumber}</div>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="youtube-link"
                                        onClick={() => handleVideoWatched(videoId)}
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
            <button className="back-btn" onClick={() => navigate('/contact')}>Back to Profile</button>
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
                            <button className="remove-btn" onClick={() => handleRemoveRoadmap(rm.id)}>Remove</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Roadmap;
import React, { useState, useEffect, useRef } from 'react';
import './Courses.css';
import { Link } from 'react-router-dom';

export const DOMAIN_PLAYLIST_IDS = [
  'PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i',
'PLfqMhTWNBTe25HU2y-3Kx6MBsasawd61U',
'PLWKjhJtqVAbkArDMazoARtNz1aMwNWmvC',
'PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88',
'PLillGF-Rfqbars4vKNtpcWVDUpVOVTlgB',
'PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb',
'PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60',
'PLillGF-RfqbbFSFYR_yJfDcdq6It6OqdO',
'PLillGF-RfqbZ3_Xr8do7Q2R752xYrDRAo',
'PLillGF-Rfqbb4ZOnsNCIB-DnLuUrQjS_G',
'PLillGF-RfqbaISD5mxDCIjsSYk4jbiXi4',
'PLillGF-RfqbZjJBAu0sx_0SCuFdzdx4iY',
'PLillGF-RfqbYE6Ik_EuXA2iZFcE082B3s',
'PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU',
'PLillGF-RfqbYhQsN5WMXy6VsDMKGadrJ-',
'PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc',
'PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv',
'PLZPZq0r_RZOOxqHgOzPyCzIl4AJjXbCYt',
'PLZPZq0r_RZOO6bGTY9jbLOyF_x6tgwcuB',
'PLZPZq0r_RZOMQArzyI32mVndGBZ3D99XQ',
'PLZPZq0r_RZONbmOn3EsHac5u5_-Rue3ne',
'PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3',
'PLZPZq0r_RZOMRMjHB_IEBjOW_ufr00yG1'
];

export const DATA_SCIENCE_PLAYLIST_IDS = [
  'PLWKjhJtqVAblvI1i46ScbKV2jH1gdL7VQ',
  'PLWKjhJtqVAbkoMsX4hgwxbJZW4aB0cbaB',
  'PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1',
  'PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f',
  'PL6Omre3duO-MPNUCcNO8TkhKqwq-9k313',
  'PL6Omre3duO-NB322ACbm4_HfdX_V02ugn',
  'PL6Omre3duO-P93dIofLn_QJv_MpmolO4D',
  'PL6Omre3duO-OqL2T_jENSW1JLITQS8_nj',
  'PL6Omre3duO-PMeRkxjU7pRkAlwqFXNWm9',
  'PL6Omre3duO-M1ISixj6xonN5_rSowMvoQ',
  'PL6Omre3duO-M1aP3UDtMHLM7rewneerqV',
  'PLeo1K3hjS3ut2o1ay5Dqh-r1kq6ZU8W0M',
  'PLeo1K3hjS3uvaRHZLl-jLovIjBP14QTXc',
  'PLeo1K3hjS3uuRh6Mvo3GJrXs87CEMGPWn',
  'PLeo1K3hjS3uu_n_a__MI_KktGTLYopZ12',
  'PLeo1K3hjS3uua3c-0jHMharEJRpmNT2gh',
  'PLYwpaL_SFmcCgBLQ9UCxMVWKqR8FEUzJ8',
  'PLYwpaL_SFmcDJ4M2i83kIwwnPit1aIOhQ',
  'PLWKjhJtqVAbl5SlE6aBHzUVZ1e6q1Wz0v'
];

export const GAME_DEV_PLAYLIST_IDS = [
  'PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv',
  'PLZPZq0r_RZOOxqHgOzPyCzIl4AJjXbCYt',
  'PLZPZq0r_RZOMRMjHB_IEBjOW_ufr00yG1',
  'PLZPZq0r_RZOOzY_vR4zJM32SqsSInGMwe',
  'PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on',
  'PLZPZq0r_RZOPNy28FDBys3GVP2LiaIyP_',
  'PL6n9fhu94yhWbn0ygHP_mLNk0hobvdvnj',
  'PL6n9fhu94yhWjzB2ss5SPaEUboyJAx-XM',
  'PL6n9fhu94yhVSqRSfp-6xJjVqR3xWK2IY',
  'PL6n9fhu94yhWlAv3hnHzOaMSeggILsZFs',
  'PLZPZq0r_RZOOkUQbat8LyQii36cJf2SWT',
  'PLBlnK6fEyqRhgMzWqbZXXd8TrBXtQiV3l',
  'PLBlnK6fEyqRjARC5ewEBG9FC-2ivxQKVA',
  'PLBlnK6fEyqRh6E-UvHKyBhoQNrRDSG-4j',
  'PLBlnK6fEyqRhytV4M_S_Nk5OJt_E0jEbW',
  'PLBlnK6fEyqRjcL24VVkQXUI_8KLv1zWc8',
  'PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc',
  'PLYwpaL_SFmcBqvw6QTRsA8gvZL3ao2ON-',
  'PLYwpaL_SFmcDz_8-pygbcNvNF0DEwKoIL',
  'PLYwpaL_SFmcAtxMe7ahYC4ZYjQHun_b-T',
  'PLu_C7oK7LrjqH7IxdBS2tMr20AHxPzcuf',
  'PLu_C7oK7Lrjr-h9d5rCjQ5X-oZuDY1ZYH',
  'PLFt_AvWsXl0fxTBI16tPwuVmF6l3_NkYF',
  'PLFt_AvWsXl0f_rlmTWiSPs8EXVuEnyB1h',
  'PLFt_AvWsXl0f4c56CbvYi038zmCmoZ4CQ',
  'PLFt_AvWsXl0cD2LPxcjxVjWTQLxJqKpgZ',
  'PLFt_AvWsXl0djuNM22htmz3BUtHHtOh7v',
  'PLFt_AvWsXl0fnA91TcmkRyhhixX9CO3Lw',
  'PLZPZq0r_RZON1eaqfafTnEexRzuHbfZX8'
];

export const AI_PLAYLIST_IDS = [
  'PLD80i8An1OEFYv0r6gULbeYY8QGjdtSw-',
  'PLD80i8An1OEGZ2tYimemzwC3xqkU0jKUg',
  'PLeo1K3hjS3utjalsQ32f6fYcLkWvf3-rA',
  'PLeo1K3hjS3uvqU_A4uzpbCNyTI5HbiEm4',
  'PLeo1K3hjS3uuKaU2nBDwr6zrSOTzNCs0l',
  'PLeo1K3hjS3ut2o1ay5Dqh-r1kq6ZU8W0M',
  'PLeo1K3hjS3uvaRHZLl-jLovIjBP14QTXc',
  'PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw',
  'PLWPirh4EWFpEjbNicXUZk0wrPBzBlAlU_',
  'PLWPirh4EWFpEV7539u8r_afMlRbt5sa6Q',
  'PLOLWGEXpOrBzAHnRf3-F_ypf5kX_WsYvO',
  'PLOLWGEXpOrByXHRGMfU1b7X4esb-c1i2N',
  'PLOLWGEXpOrBzV-o9E1qWnisuxNJuePBEG',
  'PLOLWGEXpOrBxHOzhwnBDU6HOGCTm87UiY',
  'PLLhBy6YSIT0DNkQQmt16gZRQnFPQKD318',
  'PLEiEAq2VkUUIW49-3u2oj7XwJEZoWKxBF',
  'PLEiEAq2VkUULjxp4UxA9Z4ca5pvHqFmy7',
  'PLEiEAq2VkUUIUgmP1bAbcoOuGketuOi6U',
  'PLEiEAq2VkUUJ9VOQkH_xU-MGg-z67Gyra',
  'PLLhBy6YSIT0AtWO_ldCwGNCQ4Id1WWov2'
];

export const MOBILE_DEV_PLAYLIST_IDS = [
  'PLsyeobzWxl7oa1WO9n4cP3OY9nOtUcZIg',
  'PLsyeobzWxl7qbKoSgR5ub6jolI8-ocxCF',
  'PLsyeobzWxl7q6oUFts2erdot6jxF_lisP',
  'PLsyeobzWxl7rccHHxqmSaNLD2gf7t_Eip',
  'PLsyeobzWxl7pSqMzPF_SlvQ0IdcGA-XI2',
  'PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3',
  'PLsyeobzWxl7rooJFZhc3qPLwVROovGCfh',
  'PLUhfM8afLE_N2rYb3C6BE6nBn6v_oCY9A',
  'PLUhfM8afLE_OaJOVXCboP9PRuhvirFqgk',
  'PLUhfM8afLE_NAzt-k3CIs4m4yndkku80D',
  'PLUhfM8afLE_OhwmYSj3I0pc-7eV4gdhHh',
  'PLUhfM8afLE_OwjgXnBxikbym0d3QGvhTZ',
  'PLSrm9z4zp4mFwug3OIZnL9Fq_txkIhNJc',
  'PLSrm9z4zp4mFttjku-3wiRkPH1lDRQLYy',
  'PLSrm9z4zp4mHWc6emIR_X4WcLLA5pD2Fp',
  'PLSrm9z4zp4mGmSn4w5fBs5EsRiQxTSl-r',
  'PLSrm9z4zp4mE-o3sPq-PqzGHoFAIsQFI6',
  'PLMRqhzcHGw1YZ63-rrun604ee7M4iglaJ',
  'PLMRqhzcHGw1aYtbJQUR1lhmPzzaCQWl8z',
  'PLMRqhzcHGw1bXAOgzO8HokHyq9vmSeq1L',
  'PLMRqhzcHGw1ZsFRLAWa_Axx7daXteynjh',
  'PLMRqhzcHGw1b89DXHOVA77ozWXWmuBkWX',
  'PLRAV69dS1uWRH0QDzQaKLQEYD26YCQ5eS',
  'PLRAV69dS1uWTNPzObtUpbxe1L1lB97z2R',
  'PLRAV69dS1uWR7KF-zV6YPYtKYEHENETyE',
  'PLRAV69dS1uWTcGaBdIhAU4rdvhWKl1spk',
  'PLRAV69dS1uWSjBBJ-egNNOd4mdblt1P4c',
  'PLRAV69dS1uWRPSfKzwZsIm-Axxq-LxqhW',
  'PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2',
  'PL4cUxeGkcC9hgO93oEHPBMuLA20y0SBVK',
  'PL4cUxeGkcC9gwXT3edSVZitfmIhRcwx_T',
  'PL4cUxeGkcC9ic9O6xDW2d1qMp3rMOb0Nu'
];

const TECHNOLOGY_PLAYLIST_IDS = [
  'PLZPZq0r_RZOOzY_vR4zJM32SqsSInGMwe',
  'PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on',
  'PLWKjhJtqVAbmUE5IqyfGYEYjrZBYzaT4m',
  'PLz8TdOA7NTzR1NxoC8yRIWfaO0Yrj9gVB',
  'PLAY30bf7ZN4yWIfNufseR9IcbJzCZwCNP',
  'PLAY30bf7ZN4zxLRs7Bxno0m3EQxemRoKo',
  'PLAY30bf7ZN4wroHBS3y_5XYQh_hy_PdvZ',
  'PLAY30bf7ZN4zVbF1V8X2zdsMnMJmUPIG_',
  'PLAY30bf7ZN4wrOAKoZ0TYF67rJMDy_CUV',
  'PLAY30bf7ZN4wI9SN4YMowKsU4geowi7w-',
  'PL_67py5gIqwPMI9sBUdDdEMVecZaXBBAK',
  'PL_67py5gIqwMiAoDhxIgt_z6vOt-6AYUr',
  'PL_67py5gIqwPpckEnMY3JtiRcJqqWUf3_',
  'PL_67py5gIqwPKo0gROo4uPLCSllZD7xt6'
];
const DOMAIN_API_KEY = 'AIzaSyCwkZPBInHovr1jij2cbOQrLj6elW6NBwE';
const AI_API_KEY = 'AIzaSyAF_buLKadyaFn0CwatrPP545plDQ_NQ4A';
const MOBILE_DEV_API_KEY = 'AIzaSyCrHMb5V__f_D2dNBNvGSeSzf2ziZnSKJs';
const TECHNOLOGY_API_KEY = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';
const MAX_RESULTS = 30;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [show3DRect, setShow3DRect] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const containerRef = useRef(null);
  const backToTopBtnRef = useRef(null);

  const getStoredViewCounts = () => {
    const stored = localStorage.getItem('videoViewCounts');
    return stored ? JSON.parse(stored) : {};
  };

  const saveViewCounts = (counts) => {
    localStorage.setItem('videoViewCounts', JSON.stringify(counts));
  };

  const fetchPlaylistVideos = async (playlistId) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${DOMAIN_API_KEY}`
    );
    const data = await response.json();
    const storedCounts = getStoredViewCounts();
    return data.items.map(item => {
      const videoId = item.snippet.resourceId.videoId;
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId,
        viewCount: storedCounts[videoId] || 0
      };
    });
  };

  const fetchAIPlaylistVideos = async (playlistId) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${AI_API_KEY}`
    );
    const data = await response.json();
    const storedCounts = getStoredViewCounts();
    return data.items.map(item => {
      const videoId = item.snippet.resourceId.videoId;
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId,
        viewCount: storedCounts[videoId] || 0
      };
    });
  };

  const fetchMobileDevPlaylistVideos = async (playlistId) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${MOBILE_DEV_API_KEY}`
    );
    const data = await response.json();
    const storedCounts = getStoredViewCounts();
    return data.items.map(item => {
      const videoId = item.snippet.resourceId.videoId;
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId,
        viewCount: storedCounts[videoId] || 0
      };
    });
  };

  const fetchTechnologyPlaylistVideos = async (playlistId) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${TECHNOLOGY_API_KEY}`
    );
    const data = await response.json();
    const storedCounts = getStoredViewCounts();
    return data.items.map(item => {
      const videoId = item.snippet.resourceId.videoId;
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId,
        viewCount: storedCounts[videoId] || 0
      };
    });
  };

  const fetchAndSetVideos = async (query) => {
    const fetchedVideos = await fetchVideos(query); // fetchVideos should be implemented to call YouTube API
    setYoutubeVideos(fetchedVideos);
  };

  const loadDomainCourses = async () => {
    try {
      const allCourses = await Promise.all(DOMAIN_PLAYLIST_IDS.map(fetchPlaylistVideos));
      setCourses(allCourses.flat().sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadDataScienceCourses = async () => {
    try {
      const dataScienceCourses = await Promise.all(DATA_SCIENCE_PLAYLIST_IDS.map(fetchAIPlaylistVideos));
      setCourses(dataScienceCourses.flat().sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading data science courses:', error);
    }
  };

  const loadGameDevCourses = async () => {
    try {
      const gameDevCourses = await Promise.all(GAME_DEV_PLAYLIST_IDS.map(fetchPlaylistVideos));
      setCourses(gameDevCourses.flat().sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading game development courses:', error);
    }
  };

  const loadAICourses = async () => {
    try {
      const aiCourses = await Promise.all(AI_PLAYLIST_IDS.map(fetchAIPlaylistVideos));
      setCourses(aiCourses.flat().sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading AI courses:', error);
    }
  };

  const loadMobileDevCourses = async () => {
    try {
      const mobileDevCourses = await Promise.all(MOBILE_DEV_PLAYLIST_IDS.map(fetchMobileDevPlaylistVideos));
      setCourses(mobileDevCourses.flat().sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading mobile development courses:', error);
    }
  };

  const loadTechnologyCourses = async () => {
    try {
      const techCourses = await Promise.all(TECHNOLOGY_PLAYLIST_IDS.map(fetchTechnologyPlaylistVideos));
      setCourses(techCourses.flat().sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading technology courses:', error);
    }
  };

  const loadAllCourses = async () => {
    try {
      const allDomain = await Promise.all(DOMAIN_PLAYLIST_IDS.map(fetchPlaylistVideos));
      const allDataScience = await Promise.all(DATA_SCIENCE_PLAYLIST_IDS.map(fetchPlaylistVideos));
      const allGameDev = await Promise.all(GAME_DEV_PLAYLIST_IDS.map(fetchPlaylistVideos));
      const allAI = await Promise.all(AI_PLAYLIST_IDS.map(fetchAIPlaylistVideos));
      const allMobile = await Promise.all(MOBILE_DEV_PLAYLIST_IDS.map(fetchMobileDevPlaylistVideos));
      const allTech = await Promise.all(TECHNOLOGY_PLAYLIST_IDS.map(fetchTechnologyPlaylistVideos));
      const allCourses = [
        ...allDomain.flat(),
        ...allDataScience.flat(),
        ...allGameDev.flat(),
        ...allAI.flat(),
        ...allMobile.flat(),
        ...allTech.flat()
      ];
      setCourses(allCourses.sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading all courses:', error);
    }
  };

  useEffect(() => {
    loadDomainCourses();
  }, []);

  useEffect(() => {
    const storedCounts = getStoredViewCounts();
    setCourses(prevCourses => {
        return prevCourses.map(course => ({
            ...course,
            viewCount: storedCounts[course.videoId] || course.viewCount
        }));
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const isAtTop = containerRef.current.scrollTop > 100;
        backToTopBtnRef.current.style.display = isAtTop ? 'block' : 'none';
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handlePageChange = () => {
      if (backToTopBtnRef.current) {
        backToTopBtnRef.current.style.display = 'none';
      }
    };

    window.addEventListener('popstate', handlePageChange);

    return () => {
      window.removeEventListener('popstate', handlePageChange);
    };
  }, []);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    if (icon === 'domain') {
      loadDomainCourses();
    } else if (icon === 'data') {
      loadDataScienceCourses();
    } else if (icon === 'game') {
      loadGameDevCourses();
    } else if (icon === 'ai') {
      loadAICourses();
    } else if (icon === 'mobile') {
      loadMobileDevCourses();
    } else if (icon === 'tech') {
      loadTechnologyCourses();
    } else if (icon === 'all') {
      loadAllCourses();
    } else {
      setCourses([]); // Placeholder action
    }
  };

  //add to watch later part

  const handleAddToWatchLater = (course) => {
    const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
    const exists = stored.find(item => item.videoId === course.videoId);
  
    if (!exists) {
      stored.push(course);
      localStorage.setItem('watchLater', JSON.stringify(stored));
      alert(`${course.title} added to Watch Later`);
    } else {
      alert('Already added to Watch Later');
    }
  };

  const handleVideoClick = async (videoId) => {
    setIsPlaying(true);
    setCurrentVideoId(videoId);
  
    setCourses(prevCourses => {
      const updated = prevCourses.map(course =>
        course.videoId === videoId
          ? { ...course, viewCount: course.viewCount + 1 }
          : course
      );
  
      const updatedCounts = getStoredViewCounts();
      updatedCounts[videoId] = (updatedCounts[videoId] || 0) + 1;
      saveViewCounts(updatedCounts);
  
      return updated;
    });

    
  
    
  
    try {
      await setDoc(doc(db, "users", userId, "watchLater", videoId), courseData);
      console.log("Video added to Watch Later.");
    } catch (error) {
      console.error("Error adding to Watch Later: ", error);
    }
  };

  const handleClosePlaybox = () => {
    setIsPlaying(false);
    setCurrentVideoId(null);
  };

  const backToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="courses-container">
    <div className='Courses'>
      <div className='Uper-bar'>
        <h1>Choose the Courses</h1>
      </div>

      <div className='icons-row'>
        <div className={activeIcon === 'all' ? 'icons-ai blue-3d-png-rectangle' : 'icons-ai'}>
          <img src="select-all.png" alt="All Courses" onClick={() => handleIconClick('all')} />
        </div>
        <div className='icons'>
          <ul>
            <li onClick={() => handleIconClick('domain')} className={activeIcon === 'domain' ? 'blue-3d-png-rectangle' : ''}>
              <img src="domain.png" alt="Domain" />
            </li>
            <li onClick={() => handleIconClick('game')} className={activeIcon === 'game' ? 'blue-3d-png-rectangle' : ''}>
              <img src="game-development.png" alt="Game Dev" />
            </li>
            <li onClick={() => handleIconClick('data')} className={activeIcon === 'data' ? 'blue-3d-png-rectangle' : ''}>
              <img src="data-science.png" alt="Data Science" />
            </li>
            <li onClick={() => handleIconClick('ai')} className={activeIcon === 'ai' ? 'blue-3d-png-rectangle' : ''}>
              <img src="ai.png" alt="AI" />
            </li>
            <li onClick={() => handleIconClick('mobile')} className={activeIcon === 'mobile' ? 'blue-3d-png-rectangle' : ''}>
              <img src="mobile-development.png" alt="Mobile Dev" />
            </li>
            <li onClick={() => handleIconClick('tech')} className={activeIcon === 'tech' ? 'blue-3d-png-rectangle' : ''}>
              <img src="technology.png" alt="Technology" />
            </li>
          </ul>
        </div>
      </div>

      {show3DRect && (
        <div className='blue-3d-png-rectangle'>
          <img src="select-all.png" alt="All Courses" className='all' style={{ width: 0, height: 0, margin: 0 }} />
          <img src="domain.png" alt="Domain" style={{ width: 60, height: 60, margin: 10 }} />
          <img src="game-development.png" alt="Game Dev" style={{ width: 60, height: 60, margin: 10 }} />
          <img src="data-science.png" alt="Data Science" style={{ width: 60, height: 60, margin: 10 }} />
          <img src="ai.png" alt="AI" style={{ width: 60, height: 60, margin: 10 }} />
          <img src="mobile-development.png" alt="Mobile Dev" style={{ width: 60, height: 60, margin: 10 }} />
          <img src="technology.png" alt="Technology" style={{ width: 60, height: 60, margin: 10 }} />
        </div>
      )}

      <div className='buttn'>
        <button>All</button>
        <button>Paid</button>
        <button>Free</button>
      </div>

      <div className='holevideo-container' ref={containerRef}>
        <div className='video-row'>
          {courses.map((course, index) => (
            <div className='first-box' key={index}>
              <div className='second-box'>
                <div className='video-img' onClick={() => handleVideoClick(course.videoId)}>
                  <img src={course.thumbnail} alt="video thumbnail" />
                </div>
                <div className='thumnle'>
                  <h2>{course.title}</h2>
                </div>
              </div>
              <p>Views: {course.viewCount}</p>
              <div className='last'>
                <h3>YouTube Free</h3>
                <button className='add-btn' onClick={()=>handleAddToWatchLater(course)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`playbox ${isPlaying ? 'show' : 'hide'}`} style={{ display: isPlaying ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }}> {/* Center the video */}
        {currentVideoId && (
          <iframe
            width="100%" // Set to full width of the playbox
            height="95%" // Adjusted height
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video player"
          ></iframe>
        )}
        <button className='close-btn' onClick={handleClosePlaybox}>Close</button>
      </div>

      <button className='back-to-top' onClick={backToTop} ref={backToTopBtnRef}>
        Back to Top
      </button>



      <div className="watch-later-shortcut">
  <Link to="/watchlater">
    <button className="watch-later-btn">Go to Watch Later</button>
  </Link>
</div>

    </div>
    </div>
  );
  
};

export default Courses;

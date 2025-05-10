import React from 'react'
import './Chatting.css'
import { assets } from '../../assets/assets'

const Chatting = () => {
    const [extended, setExtended] = React.useState(false);
    return (
        <div className={`sidebar ${extended ? 'expanded' : 'collapsed'}`}>
    <div className='top'>
        <img className='menu' src={assets.menu_icon} alt="" onClick={() => setExtended(!extended)} />
        <div className='new-chat'>
            <img src={assets.plus_icon} alt="" />
            {extended && <p>New Chat</p>}
        </div>
        {extended &&
            <div className="recent">
                <p className="recent-title">Recent</p>
                <div className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>What is react ....</p>
                </div>
            </div>
        }
    </div>
    <div className='bottom'>
        <div className="bottom-item">
            <img src={assets.question_icon} alt="" />
            {extended && <p>Help</p>}
        </div>
        <div className="bottom-item">
            <img src={assets.history_icon} alt="" />
            {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item">
            <img src={assets.setting_icon} alt="" />
            {extended && <p>Settings</p>}
        </div>
    </div>
</div>

    )
}

export default Chatting
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/apiCalls';
import { Link } from 'react-router-dom';

const TopBar = ({ setShowSidebar }) => {
    const [show, setShow] = useState(false);
    const wrapperProfileMenuRef = useRef(null); //close search results when click anywhere
    const dispatch = useDispatch();

    const outsideClickAlert = (e) => {
        if (wrapperProfileMenuRef.current && show && !wrapperProfileMenuRef.current.contains(e.target)) {
            setShow(false)
        }
    };

    document.addEventListener('mousedown', outsideClickAlert);

    const handleLogout = () => {
        logoutUser(dispatch);
    }

    return (
        <div className='admin_dashboard_top_bar'>
            <button type='button' className="menu__toggler topbar_menu_btn" onClick={() => setShowSidebar(true)}>
                <svg
                    className="eltdf-anim-burger"
                    x="0px"
                    y="0px"
                    width="25.333px"
                    height="13.417px"
                    viewBox="0 0 25.333 13.417"
                    enableBackground="new 0 0 25.333 13.417"
                    xmlSpace="preserve"
                >
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.167"
                        y1="0.688"
                        x2="25.167"
                        y2="0.688"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="6.694"
                        x2="25.165"
                        y2="6.694"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="12.75"
                        x2="25.165"
                        y2="12.75"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.167"
                        y1="0.688"
                        x2="25.167"
                        y2="0.688"
                        className="eltdf-burger-filler"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="6.694"
                        x2="25.165"
                        y2="6.694"
                        className="eltdf-burger-filler"
                    />
                    <line
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        x1="0.168"
                        y1="12.75"
                        x2="25.165"
                        y2="12.75"
                        className="eltdf-burger-filler"
                    />
                </svg>
            </button>
            <div className="pl-10">
                <div className="profile" ref={wrapperProfileMenuRef}>
                    <div className='position-relative'>
                        <img
                            onClick={() => setShow(!show)}
                            src="/images/avatarUser.png"
                            className='top_header_img'
                            alt=""
                        />
                        <div className={`profile_menu ${show ? 'show' : ''}`}>
                            <div className="header_heading">
                                <h6 className='title'>Kastriot Beha</h6>
                                <p className='notification_text'>Admin</p>
                            </div>
                            <Link to="/" className='border-top menu-item'>
                                <i className="fa-solid fa-gear"></i>
                                Home Application
                            </Link>
                            <Link to="/account" className='border-top menu-item'>
                                <i className="fa-regular fa-pen-to-square"></i>
                                Edit Profile
                            </Link>
                            <a href="#" className='border-top menu-item' onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                Sign Out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar;

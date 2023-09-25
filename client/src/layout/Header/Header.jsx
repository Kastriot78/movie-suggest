import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchResults from '../../pages/SearchResults/SearchResults';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiCalls';

import './style.css';
import axios from 'axios';
import { apiUrl } from '../../constants/apiUrl';


const Header = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [openSearchResults, setOpenSearchResults] = useState(false);
    const wrapperSearchRef = useRef(null); //close search results when click anywhere
    const user = useSelector((state) => state.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    const outsideClickAlert = (e) => {
        if (wrapperSearchRef.current && openSearchResults && !wrapperSearchRef.current.contains(e.target)) {
            setOpenSearchResults(false)
        }
    };

    document.addEventListener('mousedown', outsideClickAlert);

    const handleLogout = () => {
        logoutUser(dispatch);
    }

    useEffect(() => {
        const searchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/movies/by-category/${searchTerm}`);
                setSearchResults(response.data.movies);
                setOpenSearchResults(true);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching search results:', error);
            }
        };

        if (searchTerm) {
            searchMovies();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <header className='fixed-top'>
            <div className={`overlay ${menuActive ? 'active' : ''}`} onClick={() => setMenuActive(false)}></div>
            <div className="container">
                <div className="header_wrapper">
                    <Link to='/'>
                        <img src="/images/logo.png" alt="logo" />
                    </Link>

                    <div className='search-wrapper desktop_search_wrapper' ref={wrapperSearchRef}>
                        <form className='d-flex align-items-center justify-content-between w-100 search_box_form'>
                            <input
                                type="text"
                                className='search_box_text'
                                placeholder='Search by category'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className='w-10 h-10 icon_search cursor-pointer'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                        <SearchResults open={openSearchResults} searchResults={searchResults} loading={loading} searchTerm={searchTerm} user={user} />
                    </div>

                    <div className="d-flex flex-row-reverse">
                        <button type='button' className="menu__toggler" onClick={() => setMenuActive(true)}>
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

                        <div className="d-flex align-items-center">
                            <ul className={`menu menu-lg ${menuActive ? 'active' : ''}`}>
                                <button className='header_close' title='Close' onClick={() => setMenuActive(false)}>
                                    <span></span>
                                </button>
                                <li>
                                    <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}>Movies</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                                </li>
                                {
                                    user && <li>
                                        <Link to="/watchlist" className={location.pathname === '/watchlist' ? 'active' : ''}>Watchlist</Link>
                                    </li>
                                }
                                {
                                    user && user?.isAdmin && <li>
                                        <Link to="/admin/admin-dashboard" className={location.pathname === '/admin/admin-dashboard' ? 'active' : ''}>Admin Panel</Link>
                                    </li>
                                }
                                {
                                    user && <li>
                                        <Link to="/account" className={location.pathname === '/account' ? 'active' : ''}>My Account</Link>
                                    </li>
                                }
                                {
                                    !user ? <li>
                                        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
                                    </li>
                                        :
                                        <li>
                                            <Link to="/login" onClick={handleLogout}>Logout</Link>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='search-wrapper mobile_search_wrapper' ref={wrapperSearchRef}>
                    <form className='d-flex align-items-center justify-content-between w-100 search_box_form'>
                        <input
                                type="text"
                                className='search_box_text'
                                placeholder='Search by category'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        <button className='w-10 h-10 icon_search cursor-pointer'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <SearchResults open={openSearchResults} searchResults={searchResults} loading={loading} searchTerm={searchTerm} user={user} />
                </div>
            </div>
        </header>
    )
}

export default Header

import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="widget">
                                <div className="footer_logo">
                                    <a href="#">
                                        <img src="/images/logo.png" alt="" />
                                    </a>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.</p>
                            </div>

                            <div className="widget">
                                <ul className="social_icons social_white">
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-google-plus-g"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-youtube"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="widget">
                                <h6 className="widget_title">Useful Links</h6>
                                <ul className="widget_links">
                                    <li>
                                        <Link to="/watchlist">Watchlist</Link>
                                    </li>
                                    <li>
                                        <a href="#">Faq</a>
                                    </li>
                                    <li>
                                        <a href="#">Location</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="widget">
                                <h6 className="widget_title">Useful Links</h6>
                                <ul className="widget_links">
                                    <li>
                                        <a href="#">About</a>
                                    </li>
                                    <li>
                                        <a href="#">Faq</a>
                                    </li>
                                    <li>
                                        <a href="#">Location</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="widget">
                                <h6 className="widget_title">Useful Links</h6>
                                <ul className="widget_links">
                                    <li>
                                        <a href="#">About</a>
                                    </li>
                                    <li>
                                        <a href="#">Faq</a>
                                    </li>
                                    <li>
                                        <a href="#">Location</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="widget">
                                <h6 className="widget_title">Contact Info</h6>
                                <ul className="contact_info contact_info_lihght">
                                    <li>
                                        <i className="fa-solid fa-location-pin"></i>
                                        <p>Street 123 California</p>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-envelope"></i>
                                        <p>info@gmail.com</p>
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-phone"></i>
                                        <p>+45 123 456 098</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom pb-2">
                <div className="container">
                    <p className="mb-md-0 text-center text-md-start">All Rights Reserved by...</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

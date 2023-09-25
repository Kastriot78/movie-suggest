import { useSelector, useDispatch } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import { toggleWatchlist } from '../../redux/movieSlice';

import './style.css';

const WatchList = () => {
    const watchListItems = useSelector(state => state.movie.items);
    const dispatch = useDispatch();

    return (
        <div>
            <BreadCrumb title="WatchList" />
            <main className='section pt-3 pb-3'>
                <div className="container">
                    <div className="watchlist-wrap">
                        {
                            watchListItems?.length > 0 ? watchListItems?.map((item, index) => <div className="single-movie-list" key={index}>
                                <div className="movielist-content">
                                    <div className="movielist-img">
                                        <Link to={`/movie/${item?._id}`}>
                                            <img src={item?.image} alt="" />
                                        </Link>
                                    </div>
                                    <div className="movie-list-desc">
                                        <h3 className='title'>
                                            <Link to={`/movie/${item?._id}`}>{item?.title}</Link>
                                        </h3>
                                    </div>
                                </div>
                                <div className="movielist-close">
                                    <button type='button' className='watchlist-close-btn' onClick={() => dispatch(toggleWatchlist(item))}>
                                        <svg
                                            x="0px"
                                            y="0px"
                                            width="17px"
                                            height="16px"
                                            viewBox="-0.26 -0.512 17 16"
                                            enableBackground="new -0.26 -0.512 17 16"
                                            xmlSpace="preserve"
                                        >
                                            <line
                                                stroke="currentColor"
                                                strokeMiterlimit={10}
                                                x2="0.583"
                                                y2="14.593"
                                                x1="15.895"
                                                y1="0.353"
                                            />
                                            <line
                                                stroke="currentColor"
                                                strokeMiterlimit={10}
                                                x2="15.896"
                                                y2="14.593"
                                                x1="0.584"
                                                y1="0.353"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>)
                                : <div className='custom-card watchlist_empty'>
                                    <div className='px-4 py-12 d-flex justify-content-between align-items-center flex-column'>
                                        <div className='d-flex align-items-center justify-content-center w-32 h-32 bg_heart mb-4'>
                                            <i className="fa-regular fa-heart"></i>
                                        </div>
                                        <p>Watchlist is empty</p>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default WatchList;

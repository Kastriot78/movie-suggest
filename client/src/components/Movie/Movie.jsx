import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist, resetValue } from '../../redux/movieSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieModal from '../../utils/MovieModal';

import './style.css';

const Movie = ({ movie }) => {
    const watchListItems = useSelector(state => state.movie.items);
    const showAlert = useSelector(state => state.movie.added);
    const user = useSelector(state => state.user.user);
    const [openModal, setOpenModal] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleWatchList = () => {
        if (user) {
            dispatch(toggleWatchlist(movie));
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        return (() => {
            dispatch(resetValue());
        })
    }, [dispatch])

    return (
        <section className='movie_wrapper'>
            <MovieModal open={openModal} setOpen={setOpenModal} movie={movie} />
            <div className="movie-wrap text-center">
                <div className="movie-img">
                    <Link to={`/movie/${movie?._id}`}>
                        <img src={movie?.image} alt={movie?.title} />
                    </Link>
                </div>
                <div className="movie-content">
                    <h3 className='title'>{movie?.title}</h3>
                    <span>Quality: HD</span>
                    <div class="movie_buttons_wrapper">
                        <button className='submit-btn mb-2' onClick={() => setOpenModal(true)}>Trailer</button>
                        <button className='submit-btn' onClick={handleWatchList}>
                            {
                                watchListItems.some((watchListItem) => watchListItem._id === movie?._id) ? <i className="fa-solid fa-heart full-heart"></i> : 'Add to watchlist'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Movie;

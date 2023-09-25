import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './style.css';
import Movie from '../../components/Movie/Movie';
import { useEffect, useRef, useState } from 'react';
import { apiUrl } from '../../constants/apiUrl';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FindCategoryWithHighestCount } from '../../utils/findHighestCount';
import { useSelector, useDispatch } from 'react-redux';
import { getMoviesByCategory } from '../../redux/apiCalls';
import Loader from '../../utils/Loader';

const SingleMovie = () => {
    const [movie, setMovie] = useState({});
    const highestCategory = FindCategoryWithHighestCount();
    const sliderRef = useRef();
    const dispatch = useDispatch();

    const { id } = useParams();

    const { loading, movies, moviesByCategory } = useSelector(state => state.movie);

    const fetchMovie = async () => {
        await axios.get(`${apiUrl}/api/movies/${id}`)
            .then(res => {
                setMovie(res.data.movie);
            })
            .catch(error => {
                console.log('error fetching movie', error);
            });
    }

    useEffect(() => {
        fetchMovie();
        getMoviesByCategory(highestCategory, dispatch);
    }, [dispatch, highestCategory]);

    return (
        <section className='single_movie_wrapper'>
            <BreadCrumb title={movie?.title} />
            <div className="container pt-5 pb-5">
                <div className="movie">
                    <div className="image">
                        <img src={movie?.image} alt="" style={{ maxHeight: '540px' }} />
                    </div>
                    <div className="movie_details">
                        <div className="movie_details_info">
                            <ul>
                                <li>
                                    <span>Director:</span>
                                    {movie?.director}
                                </li>
                                <li>
                                    <span>Starring:</span>
                                    {movie?.starring}
                                </li>
                            </ul>
                        </div>
                        <p>{movie?.description}</p>
                    </div>
                </div>

                                {
                    moviesByCategory?.length > 0 && <div className='movies_wrapper mt-5'>
                        <div className="section-title d-flex align-items-center justify-content-between">
                            <h2>Based on your preferences</h2>
                            <div className='swiper_navigation_btns'>
                                <button className="bg-white -ml-2 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none swiper-button-prev" onClick={() => sliderRef.current?.slidePrev()}>
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="chevron-left w-6 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                                <button className="bg-white -mr-2 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none swiper-button-next" onClick={() => sliderRef.current?.slideNext()}>
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="chevron-right w-6 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <Swiper
                            spaceBetween={10}
                            // slidesPerView={4}
                            onSwiper={it => (sliderRef.current = it)}
                            breakpoints={{
                                // when window width is >= 320px
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 24,
                                },
                                // when window width is >= 640px
                                640: {
                                    slidesPerView: 4,
                                    spaceBetween: 24,
                                },
                            }}
                        >
                            {moviesByCategory?.map((movie, index) => (
                                <SwiperSlide key={index}>
                                    <Movie movie={movie} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                }

            </div>
        </section>
    )
}

export default SingleMovie;

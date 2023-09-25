import { Swiper, SwiperSlide } from 'swiper/react';
import Movie from '../../components/Movie/Movie';
import Loader from '../../utils/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMovies } from '../../redux/apiCalls';
import { useEffect, useRef } from 'react';
import { findMostFrequentCategory } from '../../utils/findFavoriteCategory';
import { getMoviesByCategory } from '../../redux/apiCalls';

import 'swiper/css';

const Movies = () => {
    const { movies, moviesByCategory, loading } = useSelector((state) => state.movie);
    const { user} = useSelector((state) => state.user);
    const watchListItems = useSelector((state) => state.movie.items);
    const mostFrequentCategory = findMostFrequentCategory(watchListItems);


    const sliderRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        getAllMovies(dispatch);
        getMoviesByCategory(mostFrequentCategory, dispatch);
    }, [dispatch])

    return (
        <section className='movies_wrapper section'>
            <div className='container'>
                <div className="section-title d-flex align-items-center justify-content-between">
                    <h2>All Movies</h2>
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

                {
                    loading ? <div className='d-flex flex-wrap'>
                        {
                            Array.from({ length: 8 }).map((_, i) => (
                                <div className='col-lg-3' key={i}>
                                    <Loader />
                                </div>
                            ))
                        }
                    </div> : <Swiper
                        spaceBetween={10}
                        // slidesPerView={4}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
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
                        {movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <Movie movie={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }

                               {
                    user && moviesByCategory?.length > 0 && <div className='movies_wrapper mt-5'>
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

export default Movies

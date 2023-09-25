import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Movie from '../../components/Movie/Movie';

import './style.css';
import Loader from '../../utils/Loader';
import { useEffect, useRef, useState } from 'react';
import { getAllMovies } from '../../redux/apiCalls';
import { useSelector, useDispatch } from 'react-redux';


const LatestMovies = () => {
    const { movies, loading } = useSelector((state) => state.movie);
    const sliderRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        getAllMovies(dispatch);
    }, [dispatch])

    return (
        <section className='movies_wrapper'>
            <div className="section-title d-flex align-items-center justify-content-between">
                <h2>Latest Movies</h2>
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
                    onSwiper={it => (sliderRef.current = it)}
                >
                    {movies?.length > 0 ? movies?.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <Movie movie={movie} />
                        </SwiperSlide>
                    )) : <div className='custom-card watchlist_empty'>
                        <div className='px-4 py-12 d-flex justify-content-between align-items-center flex-column'>
                            <div className='d-flex align-items-center justify-content-center w-32 h-32 bg_heart mb-4'>
                                <i className="fa-solid fa-film"></i>
                            </div>
                            <p>No movies</p>
                        </div>
                    </div>}
                </Swiper>
            }
        </section>
    )
}

export default LatestMovies;

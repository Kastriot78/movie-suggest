import React from 'react'
import LatestMovies from '../../pages/LatestMovies/LatestMovies'
import MovieByCategory from '../../pages/MovieByCategory/MovieByCategory'

const Home = () => {
  return (
    <div className="container">
      <div className='section'>
        <LatestMovies />
        <MovieByCategory />
      </div>
    </div>
  )
}

export default Home

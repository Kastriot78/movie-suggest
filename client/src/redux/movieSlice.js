import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    movies: [],
    moviesByCategory: [],
    items: JSON.parse(localStorage.getItem('watchlist') ?? '[]'),
    loading: false,
    error: '',
    added: false
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getMoviesStart: (state) => {
            state.loading = true;
        },
        getMoviesSuccess: (state, action) => {
            state.loading = false;
            state.movies = action.payload;
        },
        getMoviesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getMoviesByCategoryStart: (state) => {
            state.loading = true;
        },
        getMoviesByCategorySuccess: (state, action) => {
            state.loading = false;
            state.moviesByCategory = action.payload;
        },
        getMoviesByCategoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        toggleWatchlist: (state, action) => {
            const index = state?.items?.findIndex((movie) => movie._id === action.payload._id);
            if (index !== -1) {
                state?.items?.splice(index, 1);
                state.added = false;
                localStorage.setItem("watchlist", JSON.stringify(state.items));
            } else {
                state?.items?.push(action.payload);
                state.added = true;
                toast.success('Movie added to watchlist');
                localStorage.setItem("watchlist", JSON.stringify(state.items));
            }
        },
        resetValue: (state) => {
            state.added = false;
        },
    }
})

export const { getMoviesStart, getMoviesSuccess, getMoviesFailure, getMoviesByCategoryStart, getMoviesByCategorySuccess, getMoviesByCategoryFailure, toggleWatchlist, resetValue } = movieSlice.actions;
export default movieSlice.reducer;
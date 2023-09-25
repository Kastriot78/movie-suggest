import { signUpStart, signUpSuccess, signUpFailure, loginStart, loginSuccess, loginFailure, logout, updateUserStart, updateUserSuccess, updateUserFailure } from "./userRedux";
import { getMoviesStart, getMoviesSuccess, getMoviesFailure, getMoviesByCategoryStart, getMoviesByCategorySuccess, getMoviesByCategoryFailure } from './movieSlice';
import axios from 'axios';
import { apiUrl } from '../constants/apiUrl';

// user
export const register = async (user, dispatch) => {
    dispatch(signUpStart());
    try {
        const res = await axios.post(`${apiUrl}/api/users`, user, { withCredentials: true });
        dispatch(signUpSuccess(res.data));
    } catch (error) {
        console.log(error?.response?.data);
        dispatch(signUpFailure(error?.response?.data?.message));
    }
}

export const login = async (data, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${apiUrl}/api/users/auth`, data, { withCredentials: true });
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure(error?.response?.data?.message));
    }
}

export const updateUser = async (id, data, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put(`${apiUrl}/api/users/${id}`, data, { withCredentials: true });
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        console.log(error.response.data);
        dispatch(updateUserFailure(error?.response?.data?.message));
    }
}

export const logoutUser = async (dispatch) => {
    try {
        await axios.post(`${apiUrl}/api/users/logout`, {}, { withCredentials: true, credentials: "include", });
        dispatch(logout());
    } catch (error) {
        console.log(error?.response?.data?.message);
    }
}

export const getAllUsers = async (dispatch) => {
    
}
// user

// movie
export const getAllMovies = async (dispatch) => {
    try {
        dispatch(getMoviesStart());
        const res = await axios.get(`${apiUrl}/api/movies`, { withCredentials: true, credentials: "include", });
        dispatch(getMoviesSuccess(res.data));
    } catch (error) {
        dispatch(getMoviesFailure(error?.response?.data?.message));
    }
}

export const getMoviesByCategory = async (category, dispatch) => {
    try {
        dispatch(getMoviesByCategoryStart());
        const res = await axios.get(`${apiUrl}/api/movies/by-category/${category}`);
        dispatch(getMoviesByCategorySuccess(res.data.movies));
    } catch (error) {
        dispatch(getMoviesByCategoryFailure(error?.response?.data?.message));
    }
}
// movie
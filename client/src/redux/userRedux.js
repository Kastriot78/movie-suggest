import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../constants/apiUrl';

export const fetchItems = createAsyncThunk('items/fetchUsers', async () => {
    const response = await fetch(`${apiUrl}/api/users`);
    const data = await response.json();
    return data;
});

const initialState = {
    user: JSON.parse(localStorage.getItem('authUser') ?? 'null'),
    users: [],
    success: false,
    loading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.success = false;
            state.error = '';
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = '';
            state.success = true;
            state.user = action.payload;
            localStorage.setItem('authUser', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = '';
            state.loading = false;
            state.success = false;
            localStorage.removeItem('authUser');
        },
        signUpStart: (state) => {
            state.loading = true;
            state.success = false;
        }, 
        signUpSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = ''
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.pyload;
            state.success = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
            state.success = false;
        },
        updateUserSuccess: (state, action) => {
            const user = action.payload.user;
            
            state.user = { ...state.user, name: user?.username, lastName: user?.lastName, email: user?.email, password: user?.password, preferences: user?.preferences }
            // Update the user data in localStorage
            const updatedUser = JSON.stringify(state.user);
            localStorage.setItem('authUser', updatedUser);
            state.loading = false;
            state.success = true;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        clearState: (state) => {
            Object.assign(state, {
                loading: false,
                success: false,
                error: ''
            });
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchItems.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchItems.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchItems.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
    },
});

export const { loginStart, loginSuccess, loginFailure, signUpStart, signUpSuccess, signUpFailure, logout, updateUserStart, updateUserSuccess, updateUserFailure} = userSlice.actions;

export default userSlice.reducer;

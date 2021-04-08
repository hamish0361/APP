import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from 'apis/auth/authApi';
import { removeStorage, setStorage } from '_metronic/_helpers';

export const fetchToken = createAsyncThunk(
    'auth/fetchToken',
    async (body, thunkAPI) => {
        const res = await authApi.fetchToken(body);
        setStorage('token', res.access_token);
        return res;
    }
);

export const fetchMe = createAsyncThunk('auth/fetchMe', async params => {
    const res = await authApi.fetchMe(params);
    return res;
});

// export const fetchUser = createAsyncThunk('auth/fetchUser', async params => {
//     const res = await authApi.fetchUser(params);
//     return res;
// });

const initState = {
    // userList: [],
    user: undefined,
    isAuthorized: false,
    error: undefined,
    isLoading: false,
    isLogin: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logout: state => {
            state.user = undefined;
            removeStorage('token');
        },
        setLoginStatus: (state, action) => {
            state.isLogin = action.payload;
        }
    },
    extraReducers: {
        [fetchToken.pending]: state => {
            state.isAuthorized = true;
        },
        [fetchToken.fulfilled]: state => {
            state.isAuthorized = false;
        },
        [fetchToken.rejected]: state => {
            state.isAuthorized = false;
        },
        // fetch me
        [fetchMe.pending]: state => {
            state.user = undefined;
            state.error = undefined;
        },
        [fetchMe.fulfilled]: (state, action) => {
            state.user = {
                email: action.payload.email,
                role: action.payload.role?.name,
                status: action.payload.status_id,
                id: action.payload.id
            };
        },
        [fetchMe.rejected]: (state, action) => {
            state.error = action.error;
        }
        // fetch user
        // [fetchUser.pending]: state => {
        //     state.isLoading = true;
        //     state.userList = [];
        //     state.error = undefined;
        // },
        // [fetchUser.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.userList = action.payload.data;
        // },
        // [fetchUser.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.error;
        // }
    }
});

export const { logout, setLoginStatus } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;

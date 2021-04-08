import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'apis/auth/userApi';
import userStatusApi from 'apis/auth/userStatus';

// fetch user
export const fetchUsers = createAsyncThunk(
    'authService/fetchUsers',
    async (params, thunkAPI) => {
        const res = await userApi.fetchUsers(params);
        return res;
    }
);

export const fetchUserById = createAsyncThunk(
    'authService/fetchUserById',
    async (body, thunkAPI) => {
        const res = await userApi.fetchUserById(body.id, body.params);
        return res;
    }
);

export const deleteUser = createAsyncThunk(
    'authService/deleteUser',
    async (id, thunkAPI) => {
        try {
            const res = await userApi.deleteUser(id);
            thunkAPI.dispatch(fetchUsers());
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchUserStatus = createAsyncThunk(
    'authService/fetchUserStatus',
    async thunkAPI => {
        const res = await userStatusApi.fetchUserStatus();
        return res;
    }
);

export const createUserStatus = createAsyncThunk(
    'authService/createUserStatus',
    async (body, thunkAPI) => {
        const res = await userStatusApi.createUserStatus(body);
        thunkAPI.dispatch(fetchUserStatus());
        return res;
    }
);

export const updateUserStatus = createAsyncThunk(
    'authService/updateUserStatus',
    async (body, thunkAPI) => {
        const res = await userStatusApi.updateUserStatus(body.id, body.name);
        thunkAPI.dispatch(fetchUserStatus());
        return res;
    }
);

export const deleteUserStatus = createAsyncThunk(
    'authService/deleteUserStatus',
    async (id, thunkAPI) => {
        const res = await userStatusApi.deleteUserStatus(id);
        thunkAPI.dispatch(fetchUserStatus());
        return res;
    }
);

export const updateUser = createAsyncThunk(
    'authService/updateUser',
    async (body, thunkAPI) => {
        const res = await userApi.updateUser(body.id, body.params);
        return res;
    }
);

const initialState = {
    userList: [],
    userDetail: {},
    userStatus: [],
    isFirstLoading: false,
    isLoading: false,
    isActionLoading: false,
    error: '',
    pagination: {
        total: 0,
        lastPage: 0
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        initUser: state => {
            state.isFirstLoading = true;
            state.userList = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
        }
    },
    extraReducers: {
        // fetch authService
        [fetchUsers.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.userList = action.payload.data;
            state.isLoading = false;
            state.isFirstLoading = false;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchUsers.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
            state.isFirstLoading = false;
        },
        [fetchUserById.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchUserById.fulfilled]: (state, action) => {
            state.userDetail = action.payload;
            state.isLoading = false;
        },
        [fetchUserById.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
        [deleteUser.pending]: state => {
            state.isActionLoading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteUser.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.payload;
        },
        [updateUser.pending]: state => {
            state.isActionLoading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateUser.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.payload;
        },
        [fetchUserStatus.pending]: state => {
            state.isLoading = true;
            state.userStatus = [];
            state.error = '';
        },
        [fetchUserStatus.fulfilled]: (state, action) => {
            state.userStatus = action.payload;
            state.isLoading = false;
        },
        [fetchUserStatus.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        }
    }
});

export const { initUser } = userSlice.actions;

export default userSlice;

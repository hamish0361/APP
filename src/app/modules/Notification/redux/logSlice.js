import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notificationApi from 'apis/notification';

export const fetchLogs = createAsyncThunk('log/fetchLogs', async params => {
    const res = await notificationApi.log.fetchAll(params);
    return res;
});

export const create = createAsyncThunk('log/create', async body => {
    const res = await notificationApi.log.create(body);
    return res;
});

const initialState = {
    list: [],
    detail: {},
    isLoading: true,
    isActionLoading: false,
    pagination: {
        total: 0,
        lastPage: 0
    },
    error: ''
};

const logSlice = createSlice({
    name: 'log',
    initialState: initialState,
    reducers: {
        resetLog: state => {
            state.list = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
        }
    },
    extraReducers: {
        // fetch
        [fetchLogs.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchLogs.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchLogs.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // create
        [create.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [create.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [create.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export const { resetLog } = logSlice.actions;

export default logSlice;

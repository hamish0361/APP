import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountingApi from 'apis/accounting';

export const fetchUserCurrency = createAsyncThunk(
    'userCurrency/fetchUserCurrency',
    async params => {
        const res = await accountingApi.userCurrency.fetchAll(params);
        return res;
    }
);

const initialState = {
    list: [],
    isLoading: true,
    error: '',
    pagination: {
        total: 0,
        lastPage: 0
    }
};

const userCurrencySlice = createSlice({
    name: 'userCurrency',
    initialState: initialState,
    reducers: {
        resetUserCurrency: state => {
            state.list = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
        }
    },
    extraReducers: {
        // fetch
        [fetchUserCurrency.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchUserCurrency.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchUserCurrency.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        }
    }
});

export const { resetUserCurrency } = userCurrencySlice.actions;

export default userCurrencySlice;

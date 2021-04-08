import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import currencyApi from 'apis/accounting/currencyApi';

// fetch user
export const fetchCurrency = createAsyncThunk(
    'authService/fetchCurrency',
    async (params, thunkAPI) => {
        const res = await currencyApi.fetchCurrency(params);
        return res;
    }
);

const initialState = {
    currencyList: [],
    isLoading: true,
    isActionLoading: false,
    error: '',
    pagination: {
        total: 0,
        lastPage: 0
    }
};

export const currencySlice = createSlice({
    name: 'currency',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch order
        [fetchCurrency.pending]: state => {
            state.isLoading = true;
            state.currencyList = [];
            state.error = '';
        },
        [fetchCurrency.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currencyList = action.payload.data;
        },
        [fetchCurrency.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        }
    }
});

export default currencySlice;

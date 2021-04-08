import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountingApi from 'apis/accounting';

export const fetchReceipt = createAsyncThunk(
    'receipt/fetchReceipt',
    async params => {
        const res = await accountingApi.receipt.fetchAll(params);
        return res;
    }
);

const initialState = {
    list: []
};

const receiptSlice = createSlice({
    name: 'receipt',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch
        [fetchReceipt.pending]: state => {
            state.list = [];
        },
        [fetchReceipt.fulfilled]: (state, action) => {
            state.list = action.payload.data;
        }
    }
});

export default receiptSlice;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchReceipts = createAsyncThunk(
    'warehouse/fetchReceipts',
    async (params, thunkAPI) => {
        const data = warehouseApi.receipt.fetchReceipts(params);
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        pagination: {
            page: 1,
            limit: 15,
            total: 0
        },
        loading: true,
    },
};

const receiptSlice = createSlice({
    name: 'receipt',
    initialState,
    reducers: {
        setPage(state, action) {
            state.list.pagination.page = action.payload
        }
    },
    extraReducers: {
        [fetchReceipts.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchReceipts.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;
            state.list.loading = false;

            state.list.pagination.total = action.payload.total;
            state.list.pagination.limit = action.payload.per_page;

            return;
        },
        [fetchReceipts.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
    },
});

const receiptReducer = receiptSlice.reducer;

export const receiptAction = receiptSlice.actions;

export default receiptReducer;

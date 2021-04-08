import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchBoxItems = createAsyncThunk(
    'warehouse/fetchBoxItems',
    async (params, thunkAPI) => {
        const data = warehouseApi.boxItem.fetchBoxItems({ appends: 'product', ...params });
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            lastPage: 0,
        },
        filter: {
            field: undefined,
            operator: undefined,
            value: undefined
        },
        loading: true,
    },
    detail: {
        data: undefined,
        loading: true,
    }
};

const boxItemSlice = createSlice({
    name: 'boxItem',
    initialState,
    reducers: {
        changePagination(state, action) {
            state.list.pagination.page = action.payload.page;
        },
        resetParams(state, action) {
            state = initialState
        },
    },
    extraReducers: {
        [fetchBoxItems.pending]: (state, action) => {
            state.list.loading = true;

            state.list.data = [];
            state.list.pagination.total = 0;
        },
        [fetchBoxItems.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.loading = false;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;

            return;
        },
        [fetchBoxItems.rejected]: (state, action) => {
            state.list.data = [];
            state.list.pagination.total = 0;

            state.list.loading = false;

            return;
        }
    },
});

const boxItemReducer = boxItemSlice.reducer;
export const boxItemAction = boxItemSlice.actions;

export default boxItemReducer;

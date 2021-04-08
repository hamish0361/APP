import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchPallets = createAsyncThunk(
    'warehouse/fetchPallets',
    async (params, thunkAPI) => {
        const data = warehouseApi.pallet.fetchPallets(params);
        return data;
    }
);

export const fetchPallet = createAsyncThunk(
    'warehouse/fetchPallet',
    async ({id, ...params}, thunkAPI) => {
        const data = warehouseApi.pallet.fetchPallet(id, params);
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        pagination: {
            page: 1,
            limit: 15,
            total: 0,
            lastPage: 0,
        },
        loading: true,
    },
    detail: {
        data: undefined,
        loading: true
    }
};

const palletSlice = createSlice({
    name: 'pallet',
    initialState,
    reducers: {
        changePagination(state, action) {
            state.list.pagination.page = action.payload.page;
        },
        resetParams(state) {
            state.list.pagination = initialState.list.pagination;
        }
    },
    extraReducers: {
        [fetchPallets.pending]: (state, action) => {
            state.list.loading = true;

            return;
        },
        [fetchPallets.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.lastPage = action.payload.last_page;
            state.list.loading = false;

            return;
        },
        [fetchPallets.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchPallet.pending]: (state, action) => {
            state.detail.loading = true;

            return;
        },
        [fetchPallet.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchPallet.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const palletReducer = palletSlice.reducer;

export const palletAction = palletSlice.actions;

export default palletReducer;

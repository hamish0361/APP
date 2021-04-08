import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchShelves = createAsyncThunk(
    'warehouse/fetchShelves',
    async (params, thunkAPI) => {
        const data = warehouseApi.shelve.fetchShelves(params);
        return data;
    }
);

export const fetchShelve = createAsyncThunk(
    'warehouse/fetchShelve',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.shelve.fetchShelve(id, { ...params });
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
            lastPage: 0
        },
        loading: true,
        filter: {
            area_id: '',
            floor: 1
        }
    },
    detail: {
        data: undefined,
        loading: true
    },
    
};

const shelveSlice = createSlice({
    name: 'shelve',
    initialState,
    reducers: {
        changePage(state, action) {
            state.list.pagination.page = action.payload;
        },
        resetParams(state, action) {
            state.list.pagination = initialState.list.pagination;
        },
        changeFilter(state, action) {
            if(action.payload?.area_id) state.list.filter.area_id = action.payload?.area_id;
            if(action.payload?.floor) state.list.filter.floor = action.payload?.floor;
        },
    },
    extraReducers: {
        [fetchShelves.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchShelves.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;
            state.list.loading = false;

            return;
        },
        [fetchShelves.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchShelve.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchShelve.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchShelve.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const shelveReducer = shelveSlice.reducer;

export const shelveAction = shelveSlice.actions;

export default shelveReducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchBoxOwners = createAsyncThunk(
    'warehouse/fetchBoxOwners',
    async (params, thunkAPI) => {
        const data = warehouseApi.boxOwner.fetchBoxOwners(params);
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
            lastPage: 0
        },
        loading: true
    },
};

const boxOwnerSlice = createSlice({
    name: 'boxOwner',
    initialState,
    reducers: {
        changePagination(state, action) {
            state.list.pagination.page = action.payload.page;
        },
        resetParams(state) {
            state.list = { ...initialState.list };
        },
    },
    extraReducers: {
        [fetchBoxOwners.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchBoxOwners.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.loading = false;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;

            return;
        },
        [fetchBoxOwners.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
    }
});

const boxOwnerReducer = boxOwnerSlice.reducer;
export const boxOwnerAction = boxOwnerSlice.actions;

export default boxOwnerReducer;

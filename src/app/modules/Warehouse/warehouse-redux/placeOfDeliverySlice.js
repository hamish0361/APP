import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchPlaceOfDeliveries = createAsyncThunk(
    'warehouse/fetchPlaceOfDeliveries',
    async (params, thunkAPI) => {
        const data = warehouseApi.placeOfDelivery.fetchPlaceOfDeliveries(params);
        return data;
    }
);

export const fetchPlaceOfDelivery = createAsyncThunk(
    'warehouse/fetchPlaceOfDelivery',
    async ({id, ...params}, thunkAPI) => {
        const data = warehouseApi.placeOfDelivery.fetchPlaceOfDelivery(id, params);
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

const placeOfDeliverySlice = createSlice({
    name: 'placeOfDelivery',
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
        [fetchPlaceOfDeliveries.pending]: (state, action) => {
            state.list.loading = true;

            return;
        },
        [fetchPlaceOfDeliveries.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.lastPage = action.payload.last_page;
            state.list.loading = false;

            return;
        },
        [fetchPlaceOfDeliveries.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchPlaceOfDelivery.pending]: (state, action) => {
            state.detail.loading = true;

            return;
        },
        [fetchPlaceOfDelivery.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchPlaceOfDelivery.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const placeOfDeliveryReducer = placeOfDeliverySlice.reducer;

export const placeOfDeliveryAction = placeOfDeliverySlice.actions;

export default placeOfDeliveryReducer;

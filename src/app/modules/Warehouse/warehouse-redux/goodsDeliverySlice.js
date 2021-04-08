import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchGoodsDeliveries = createAsyncThunk(
    'warehouse/fetchGoodsDeliveries',
    async (params, thunkAPI) => {
        const data = warehouseApi.goodsDelivery.fetchGoodsDeliveries({...params, orderBy: 'created_at', sortedBy: 'desc' });
        return data;
    }
);

export const fetchGoodsDelivery = createAsyncThunk(
    'warehouse/fetchGoodsDelivery',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.goodsDelivery.fetchGoodsDelivery(id, { ...params });
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
        loading: false,
    },
    detail: {
        data: undefined,
        loading: true,
    },
};

const goodsDeliverySlice = createSlice({
    name: 'goodsDelivery',
    initialState,
    reducers: {
        setPage(state, action) {
            state.list.pagination.page = action.payload;
        }
    },
    extraReducers: {
        [fetchGoodsDeliveries.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchGoodsDeliveries.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;
            state.list.loading = false;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;

            return;
        },
        [fetchGoodsDeliveries.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchGoodsDelivery.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchGoodsDelivery.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchGoodsDelivery.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const goodsDeliveryReducer = goodsDeliverySlice.reducer;

export const goodsDeliveryAction = goodsDeliverySlice.actions;

export default goodsDeliveryReducer;

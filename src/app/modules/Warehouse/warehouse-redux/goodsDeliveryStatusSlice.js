import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchGoodsDeliveryStatuses = createAsyncThunk(
    'warehouse/fetchGoodsDeliveryStatuses',
    async (params, thunkAPI) => {
        const data = warehouseApi.goodsDeliveryStatus.fetchGoodsDeliveryStatuses(params);
        return data;
    }
);

export const fetchGoodsDeliveryStatus = createAsyncThunk(
    'warehouse/fetchGoodsDeliveryStatus',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.goodsDeliveryStatus.fetchGoodsDeliveryStatus(id, { ...params });
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        loading: false,
    },
    detail: {
        data: undefined,
        loading: true,
    },
};

const goodsDeliveryStatusSlice = createSlice({
    name: 'goodsDeliveryStatus',
    initialState,
    reducers: {
        setPage(state, action) {
            state.list.pagination.page = action.payload;
        }
    },
    extraReducers: {
        [fetchGoodsDeliveryStatuses.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchGoodsDeliveryStatuses.fulfilled]: (state, action) => {
            state.list.data = action.payload;
            state.list.loading = false;

            return;
        },
        [fetchGoodsDeliveryStatuses.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchGoodsDeliveryStatus.fulfilled]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchGoodsDeliveryStatus.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchGoodsDeliveryStatus.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const goodsDeliveryStatusReducer = goodsDeliveryStatusSlice.reducer;

export const goodsDeliveryStatusAction = goodsDeliveryStatusSlice.actions;

export default goodsDeliveryStatusReducer;

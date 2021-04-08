import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderCostApi from 'apis/order/orderCostApi';

// fetch
export const fetchOrderCost = createAsyncThunk(
    'orderCost/fetchOrderCost',
    async params => {
        const res = await orderCostApi.fetchOrderCost(params);
        return res;
    }
);

// fetch by id
export const fetchOrderCostById = createAsyncThunk(
    'orderCost/fetchOrderCostById',
    async id => {
        const res = await orderCostApi.fetchOrderCostById(id);
        return res;
    }
);

// update
export const updateOrderCost = createAsyncThunk(
    'orderCost/updateOrderCost',
    async params => {
        const res = await orderCostApi.updateOrderCost(params.id, params.body);
        return res;
    }
);

const initialState = {
    list: [],
    detail: undefined,
    isLoading: true,
    isActionLoading: false,
    error: '',
    pagination: {
        total: 0,
        lastPage: 0
    }
};

const orderCostSlice = createSlice({
    name: 'orderCost',
    initialState: initialState,
    reducers: {
        resetCost: state => {
            state.list = [];
            state.detail = undefined;
        }
    },
    extraReducers: {
        // fetch
        [fetchOrderCost.pending]: state => {
            state.isLoading = true;
            state.list = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
            state.error = '';
        },
        [fetchOrderCost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchOrderCost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch by id
        [fetchOrderCostById.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchOrderCostById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.detail = action.payload;
        },
        [fetchOrderCostById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // update
        [updateOrderCost.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updateOrderCost.fulfilled]: (state, action) => {
            state.isActionLoading = false;
            state.detail = action.payload;
        },
        [updateOrderCost.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export const { resetCost } = orderCostSlice.actions;

export default orderCostSlice;

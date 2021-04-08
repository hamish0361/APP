import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import purchaseItemApi from 'apis/order/purchaseItemApi';

// fetch order type
export const fetchPurchaseItem = createAsyncThunk(
    'purchaseItem/fetchPurchaseItem',
    async params => {
        const res = await purchaseItemApi.fetchPurchaseItem(params);
        return res;
    }
);

// update order type
export const updatePurchaseItem = createAsyncThunk(
    'purchaseItem/updatePurchaseItem',
    async params => {
        const res = await purchaseItemApi.updatePurchaseItem(
            params.id,
            params.body
        );
        return res;
    }
);
export const createPurchaseItemOrder = createAsyncThunk(
    'purchaseItem/createPurchaseItemOrder',
    async params => {
        const res = await purchaseItemApi.createPurchaseItemOrder(params);
        return res;
    }
);

const initialState = {
    list: [],
    isLoading: true,
    isActionLoading: false,
    error: '',
    pagination: {
        total: 0,
        lastPage: 0
    }
};

const purchaseItemSlice = createSlice({
    name: 'purchaseItem',
    initialState: initialState,
    reducers: {
        resetPurchaseItem: state => {
            state.list = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
        }
    },
    extraReducers: {
        // fetch purchase
        [fetchPurchaseItem.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchPurchaseItem.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchPurchaseItem.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // update purchase
        [updatePurchaseItem.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updatePurchaseItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updatePurchaseItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        //create purchase item order
        [createPurchaseItemOrder.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createPurchaseItemOrder.fulfilled]: state => {
            state.isActionLoading = false;
        },
        [createPurchaseItemOrder.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export const { resetPurchaseItem } = purchaseItemSlice.actions;

export default purchaseItemSlice;

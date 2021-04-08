import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderItemApi from 'apis/order/orderItemApi';

// fetch order type
export const fetchOrderItem = createAsyncThunk(
    'item/fetchOrderItem',
    async params => {
        const res = await orderItemApi.fetchOrderItem(params);
        return res;
    }
);

// fetch order type by id
export const fetchOrderItemById = createAsyncThunk(
    'item/fetchOrderItemById',
    async body => {
        const { id, params } = body;
        const res = await orderItemApi.fetchOrderItemById(id, params);
        return res;
    }
);

// create order type
export const createOrderItem = createAsyncThunk(
    'item/createOrderItem',
    async params => {
        const res = await orderItemApi.createOrderItem(params);
        return res;
    }
);

// update order type
export const updateOrderItem = createAsyncThunk(
    'item/updateOrderItem',
    async params => {
        const { id, body } = params;
        const res = await orderItemApi.update(id, body);
        return res;
    }
);

// delete order type
export const deleteOrderItem = createAsyncThunk(
    'item/deleteOrderItem',
    async id => {
        const res = await orderItemApi.deleteOrderItem(id);
        return res;
    }
);

const initialState = {
    itemList: [],
    itemDetail: undefined,
    isLoading: true,
    isActionLoading: false,
    pagination: {
        currentPage: 0,
        total: 0,
        lastPage: 0
    },
    error: ''
};

const orderItemSlice = createSlice({
    name: 'item',
    initialState: initialState,
    reducers: {
        resetOrderItem: state => {
            state.itemList = [];
            state.pagination = {
                currentPage: 1,
                total: 0,
                lastPage: 1
            };
        }
    },
    extraReducers: {
        // fetch
        [fetchOrderItem.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchOrderItem.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.itemList = action.payload.data;
            state.pagination = {
                currentPage: action.payload.current_page,
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchOrderItem.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch by id
        [fetchOrderItemById.pending]: state => {
            state.isLoading = true;
            state.itemDetail = undefined;
            state.error = '';
        },
        [fetchOrderItemById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.itemDetail = action.payload;
        },
        [fetchOrderItemById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // create
        [createOrderItem.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createOrderItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createOrderItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // delete
        [deleteOrderItem.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [deleteOrderItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteOrderItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update
        [updateOrderItem.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updateOrderItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateOrderItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export const { resetOrderItem } = orderItemSlice.actions;

export default orderItemSlice;

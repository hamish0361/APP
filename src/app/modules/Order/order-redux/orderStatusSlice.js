import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderStatusApi from 'apis/order/orderStatusApi';

// fetch order type
export const fetchOrderStatus = createAsyncThunk(
    'status/fetchOrderStatus',
    async params => {
        const res = await orderStatusApi.fetchOrderStatus(params);
        return res;
    }
);

// create order type
export const createOrderStatus = createAsyncThunk(
    'status/createOrderStatus',
    async params => {
        const res = await orderStatusApi.createOrderStatus(params);
        return res;
    }
);

// update order type
export const updateOrderStatus = createAsyncThunk(
    'status/updateOrderStatus',
    async body => {
        const res = await orderStatusApi.updateOrderStatus(
            body.type,
            body.params
        );
        return res;
    }
);

// delete order type
export const deleteOrderStatus = createAsyncThunk(
    'status/deleteOrderStatus',
    async (id, thunkAPI) => {
        const res = await orderStatusApi.deleteOrderStatus(id);
        thunkAPI.dispatch(fetchOrderStatus());
        return res;
    }
);

const initialState = {
    list: [],
    error: ''
};

const orderStatusSlice = createSlice({
    name: 'status',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch order
        [fetchOrderStatus.pending]: state => {
            state.list = [];
            state.error = '';
        },
        [fetchOrderStatus.fulfilled]: (state, action) => {
            state.list = action.payload;
        },
        [fetchOrderStatus.rejected]: (state, action) => {
            state.error = action.error;
        },
        // delete order
        [deleteOrderStatus.pending]: state => {},
        [deleteOrderStatus.fulfilled]: (state, action) => {},
        [deleteOrderStatus.rejected]: (state, action) => {}
    }
});

export default orderStatusSlice;

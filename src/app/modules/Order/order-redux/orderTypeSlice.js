import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderTypeApi from 'apis/order/orderTypeApi';

// fetch order type
export const fetchOrderType = createAsyncThunk(
    'type/fetchOrderType',
    async params => {
        const res = await orderTypeApi.fetchOrderType(params);
        return res;
    }
);

// create order type
export const createOrderType = createAsyncThunk(
    'type/createOrderType',
    async params => {
        const res = await orderTypeApi.createOrderType(params);
        return res;
    }
);

// update order type
export const updateOrderType = createAsyncThunk(
    'type/updateOrderType',
    async body => {
        const res = await orderTypeApi.updateOrderType(body.type, body.params);
        return res;
    }
);

// delete order type
export const deleteOrderType = createAsyncThunk(
    'type/deleteOrderType',
    async (id, thunkAPI) => {
        const res = await orderTypeApi.deleteOrderType(id);
        thunkAPI.dispatch(fetchOrderType());
        return res;
    }
);

const initialState = {
    list: [],
    error: ''
};

const orderTypeSlice = createSlice({
    name: 'type',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch Order
        [fetchOrderType.pending]: state => {
            state.list = [];
            state.error = '';
        },
        [fetchOrderType.fulfilled]: (state, action) => {
            state.list = action.payload;
        },
        [fetchOrderType.rejected]: (state, action) => {
            state.error = action.error;
        },
        // delete order
        [deleteOrderType.pending]: state => {},
        [deleteOrderType.fulfilled]: (state, action) => {},
        [deleteOrderType.rejected]: (state, action) => {
            state.error = action.error;
        },
        // update order
        [updateOrderType.pending]: state => {},
        [updateOrderType.fulfilled]: (state, action) => {},
        [updateOrderType.rejected]: (state, action) => {
            state.error = action.error;
        }
    }
});

export default orderTypeSlice;

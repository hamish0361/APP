import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from 'apis/order/orderApi';

// fetch order
export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async (params, thunkAPI) => {
        const res = await orderApi.fetchOrder(params);
        return res;
    }
);

// fetch order by id
export const fetchOrderById = createAsyncThunk(
    'order/fetchOrderById',
    async body => {
        const res = await orderApi.fetchOrderById(body.id, body.params);
        return res;
    }
);

// create order
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (params, thunkAPI) => {
        const res = await orderApi.createOrder(params);
        thunkAPI.dispatch(fetchOrder());
        return res;
    }
);

//create order payment
export const createOrderPayment = createAsyncThunk(
    'order/createOrderPayment',
    async (body, thunkAPI) => {
        const res = await orderApi.createOrderPayment(body);
        thunkAPI.dispatch(fetchOrder());
        return res;
    }
);

// delete order
export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (id, thunkAPI) => {
        const res = await orderApi.deleteOrder(id);
        thunkAPI.dispatch(fetchOrder());
        return res;
    }
);

// update order
export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async params => {
        const res = await orderApi.updateOrder(params.id, params.body);
        return res;
    }
);

const initialState = {
    orderList: [],
    orderDetail: {},
    isLoading: false,
    isActionLoading: false,
    error: '',
    pagination: {
        total: 0,
        lastPage: 1
    }
};

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        resetOrder: state => {
            state.orderList = [];
            state.pagination = {
                total: 0,
                lastPage: 1
            };
        },
        resetOrderDetail: state => {
            state.orderDetail = {};
        }
    },
    extraReducers: {
        // fetch order
        [fetchOrder.pending]: state => {
            state.isLoading = true;
            state.orderList = [];
            state.error = '';
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.orderList = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
            state.isLoading = false;
        },
        [fetchOrder.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
        // fetch order by id
        [fetchOrderById.pending]: state => {
            state.orderDetail = {};
            state.isLoading = true;
            state.error = '';
        },
        [fetchOrderById.fulfilled]: (state, action) => {
            state.orderDetail = action.payload;
            state.isLoading = false;
        },
        [fetchOrderById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // delete order
        [deleteOrder.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteOrder.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create order
        [createOrder.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createOrder.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createOrder.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create order payment
        [createOrderPayment.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createOrderPayment.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createOrderPayment.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update order
        [updateOrder.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateOrder.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
        //
    }
});

export const { resetOrder, resetOrderDetail } = orderSlice.actions;

export default orderSlice;

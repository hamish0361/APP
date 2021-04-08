import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartApi from '../../../../apis/order/cartApi';

// fetch order type
export const fetchCart = createAsyncThunk('cart/fetchCart', async params => {
    const res = await cartApi.fetchCart(params);
    return res;
});

// fetch order type by id
export const fetchCartById = createAsyncThunk(
    'cart/fetchCartById',
    async body => {
        const { id, params } = body;
        const res = await cartApi.fetchCartById(id, params);
        return res;
    }
);

// create order type
export const createCart = createAsyncThunk('cart/createCart', async params => {
    const res = await cartApi.createCart(params);
    return res;
});

// update order type
export const updateCart = createAsyncThunk('cart/updateCart', async body => {
    const { id, params } = body;
    const res = await cartApi.updateCart(id, params);
    return res;
});

// delete order type
export const deleteCart = createAsyncThunk('cart/deleteCart', async id => {
    const res = await cartApi.deleteCart(id);
    return res;
});

const initialState = {
    cartList: [],
    cartDetail: undefined,
    isLoading: true,
    isActionLoading: false,
    pagination: {
        total: 0,
        lastPage: 0
    },
    error: ''
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch
        [fetchCart.pending]: state => {
            state.isLoading = true;
            state.error = '';
            state.cartList = [];
        },
        [fetchCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartList = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch by id
        [fetchCartById.pending]: state => {
            state.isLoading = true;
            state.error = '';
            state.cartDetail = undefined;
        },
        [fetchCartById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartDetail = action.payload;
        },
        [fetchCartById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // delete
        [deleteCart.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [deleteCart.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteCart.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update
        [updateCart.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updateCart.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateCart.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create
        [createCart.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createCart.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createCart.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export default cartSlice;

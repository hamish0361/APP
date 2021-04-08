import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import purchaseApi from 'apis/order/purchaseApi';

// fetch order type
export const fetchPurchase = createAsyncThunk(
    'purchase/fetchPurchase',
    async params => {
        const res = await purchaseApi.fetchPurchase(params);
        return res;
    }
);

export const fetchPurchaseById = createAsyncThunk(
    'purchase/fetchPurchaseById',
    async body => {
        const res = await purchaseApi.fetchPurchaseById(body.id, body.params);
        return res;
    }
);

// create order type
export const createPurchase = createAsyncThunk(
    'purchase/createPurchase',
    async (params, thunkAPI) => {
        const res = await purchaseApi.createPurchase(params);
        return res;
    }
);

// update order type
export const updatePurchase = createAsyncThunk(
    'purchase/updatePurchase',
    async body => {
        const res = await purchaseApi.updatePurchase(body.id, body.params);
        return res;
    }
);

// update order type
export const uploadPurchaseFile = createAsyncThunk(
    'purchase/uploadPurchaseFile',
    async body => {
        const res = await purchaseApi.uploadPurchaseFile(body.id, body.data);
        return res;
    }
);

// delete order type
export const deletePurchase = createAsyncThunk(
    'purchase/deletePurchase',
    async (id, thunkAPI) => {
        const res = await purchaseApi.deletePurchase(id);
        thunkAPI.dispatch(fetchPurchase());
        return res;
    }
);

const initialState = {
    purchaseList: [],
    isLoading: true,
    isActionLoading: false,
    error: '',
    purchaseDetail: undefined,
    pagination: {
        total: 0,
        lastPage: 0
    }
};

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: initialState,
    reducers: {
        resetPurchase: state => {
            state.purchaseList = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
        }
    },
    extraReducers: {
        // fetch purchase
        [fetchPurchase.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchPurchase.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.purchaseList = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchPurchase.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch purchase by id
        [fetchPurchaseById.pending]: state => {
            state.isLoading = true;
            state.purchaseDetail = undefined;
            state.error = '';
        },
        [fetchPurchaseById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.purchaseDetail = action.payload;
        },
        [fetchPurchaseById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // delete purchase
        [deletePurchase.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [deletePurchase.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deletePurchase.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update purchase
        [updatePurchase.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updatePurchase.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updatePurchase.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create
        [createPurchase.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createPurchase.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createPurchase.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export const { resetPurchase } = purchaseSlice.actions;

export default purchaseSlice;

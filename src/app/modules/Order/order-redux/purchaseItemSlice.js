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

export const fetchPurchaseItemById = createAsyncThunk(
    'purchaseItem/fetchPurchaseItemById',
    async body => {
        const res = await purchaseItemApi.fetchPurchaseItemById(
            body.id,
            body.params
        );
        return res;
    }
);

// create order type
export const createPurchaseItem = createAsyncThunk(
    'purchaseItem/createPurchaseItem',
    async (params, thunkAPI) => {
        const res = await purchaseItemApi.createPurchaseItem(params);
        return res;
    }
);

// update order type
export const updatePurchaseItem = createAsyncThunk(
    'purchaseItem/updatePurchaseItem',
    async body => {
        const res = await purchaseItemApi.updatePurchaseItem(
            body.id,
            body.params
        );
        return res;
    }
);

// delete order type
export const deletePurchaseItem = createAsyncThunk(
    'purchaseItem/deletePurchaseItem',
    async (id, thunkAPI) => {
        const res = await purchaseItemApi.deletePurchaseItem(id);
        return res;
    }
);

// delete order type
export const deletePurchaseDivisionItem = createAsyncThunk(
    'purchaseItem/deletePurchaseDivisionItem',
    async (id, thunkAPI) => {
        const res = await purchaseItemApi.deletePurchaseDivisionItem(id);
        return res;
    }
);

// delete order type
export const updatePurchaseDivisionItem = createAsyncThunk(
    'purchaseItem/updatePurchaseDivisionItem',
    async (params, thunkAPI) => {
        const res = await purchaseItemApi.updatePurchaseDivisionItem(
            params.id,
            params.body
        );
        return res;
    }
);

const initialState = {
    purchaseItemList: [],
    purchaseItemDetail: undefined,
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
    reducers: {},
    extraReducers: {
        // fetch purchase
        [fetchPurchaseItem.pending]: state => {
            state.isLoading = true;
            state.purchaseItemList = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
            state.error = '';
        },
        [fetchPurchaseItem.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.purchaseItemList = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchPurchaseItem.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch purchase
        [fetchPurchaseItemById.pending]: state => {
            state.isLoading = true;
            state.purchaseItemDetail = undefined;
            state.error = '';
        },
        [fetchPurchaseItemById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.purchaseItemDetail = action.payload;
        },
        [fetchPurchaseItemById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // create purchaseItem
        [createPurchaseItem.pending]: state => {
            state.isActionLoading = true;
        },
        [createPurchaseItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createPurchaseItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // delete purchaseItem
        [deletePurchaseItem.pending]: state => {
            state.isActionLoading = true;
        },
        [deletePurchaseItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deletePurchaseItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // delete purchaseItem
        [deletePurchaseDivisionItem.pending]: state => {
            state.isActionLoading = true;
        },
        [deletePurchaseDivisionItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deletePurchaseDivisionItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update purchaseItem
        [updatePurchaseItem.pending]: state => {
            state.isActionLoading = true;
        },
        [updatePurchaseItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updatePurchaseItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update purchaseItem
        [updatePurchaseDivisionItem.pending]: state => {
            state.isActionLoading = true;
        },
        [updatePurchaseDivisionItem.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updatePurchaseDivisionItem.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export default purchaseItemSlice;

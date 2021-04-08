import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taxApi from 'apis/product-api/taxApi';

//get tax list
export const fetchTax = createAsyncThunk(
    'tax/fetchTax',
    async (params, thunkAPI) => {
        const res = await taxApi.fetchTax(params);

        return res;
    }
);

//create tax
export const createTax = createAsyncThunk(
    'tax/createTax',
    async (params, thunkAPI) => {
        const res = await taxApi.createTax(params);

        return res;
    }
);

//get tax by id
export const fetchTaxById = createAsyncThunk(
    'tax/fetchTaxById',
    async (params, thunkAPI) => {
        const res = await taxApi.fetchTaxById(params);

        return res;
    }
);

//delete tax
export const deleteTax = createAsyncThunk(
    'tax/deleteTax',
    async (params, thunkAPI) => {
        await taxApi.deleteTax(params);

        return {};
    }
);

//update info tax
export const updateTax = createAsyncThunk(
    'tax/updateTax',
    async (body, thunkAPI) => {
        const res = await taxApi.updateTax(body.id, body.params);

        return res;
    }
);
const initialSate = {
    taxList: [],
    taxDetail: undefined,
    loading: false,
    isActionLoading: false,
    error: ''
};

const taxSlice = createSlice({
    name: 'tax',
    initialState: initialSate,
    reducers: {},
    extraReducers: {
        //fetch tax
        [fetchTax.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchTax.fulfilled]: (state, action) => {
            state.loading = false;
            state.taxList = action.payload;
        },
        [fetchTax.rejected]: (state, action) => {
            state.error = action.error;
        },
        //fetch tax id
        [fetchTaxById.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchTaxById.fulfilled]: (state, action) => {
            state.loading = false;
            state.taxDetail = action.payload;
        },
        [fetchTaxById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // delete tax
        [deleteTax.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [deleteTax.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteTax.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create tax
        [createTax.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createTax.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createTax.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update tax
        [updateTax.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updateTax.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateTax.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

const taxReducer = taxSlice.reducer;

export default taxReducer;

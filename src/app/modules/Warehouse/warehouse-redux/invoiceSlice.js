import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchInvoices = createAsyncThunk(
    'warehouse/fetchInvoices',
    async (params, thunkAPI) => {
        const data = warehouseApi.invoice.fetchInvoices({ orderBy: 'created_at', sortedBy: 'desc', ...params });
        return data;
    }
);

export const fetchInvoice = createAsyncThunk(
    'warehouse/fetchInvoice',
    async ({id, ...params}, thunkAPI) => {
        const data = warehouseApi.invoice.fetchInvoice(id, params);
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        pagination: {
            page: 1,
            limit: 15,
            total: 0,
            lastPage: 0,
        },
        loading: true,
    },
    detail: {
        data: undefined,
        loading: true
    }
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setPage(state, action) {
            state.list.pagination.page = action.payload;
        }
    },
    extraReducers: {
        [fetchInvoices.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchInvoices.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;
            state.list.loading = false;

            return;
        },
        [fetchInvoices.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchInvoice.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchInvoice.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchInvoice.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const invoiceReducer = invoiceSlice.reducer;

export const invoiceAction = invoiceSlice.actions;

export default invoiceReducer;

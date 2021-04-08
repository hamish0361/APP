import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchDeliveryPartners = createAsyncThunk(
    'warehouse/fetchDeliveryPartners',
    async (params, thunkAPI) => {
        const data = warehouseApi.deliveryPartner.fetchDeliveryPartners(params);
        return data;
    }
);

export const fetchDeliveryPartner = createAsyncThunk(
    'warehouse/fetchDeliveryPartner',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.deliveryPartner.fetchDeliveryPartner(id, { ...params });
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            lastPage: 0,
        },
        loading: false,
    },
    detail: {
        data: undefined,
        loading: true,
    },
};

const deliveryPartnerSlice = createSlice({
    name: 'deliveryPartner',
    initialState,
    reducers: {
        setPage(state, action) {
            state.list.pagination.page = action.payload;
        }
    },
    extraReducers: {
        [fetchDeliveryPartners.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchDeliveryPartners.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;
            state.list.loading = false;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;

            return;
        },
        [fetchDeliveryPartners.rejected]: (state, action) => {
            state.list = [];
            state.list.loading = false;

            return;
        },
        [fetchDeliveryPartner.fulfilled]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchDeliveryPartner.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchDeliveryPartner.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const deliveryPartnerReducer = deliveryPartnerSlice.reducer;

export const deliveryPartnerAction = deliveryPartnerSlice.actions;

export default deliveryPartnerReducer;

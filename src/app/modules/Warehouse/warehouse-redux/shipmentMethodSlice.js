import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchShipmentMethods = createAsyncThunk(
    'warehouse/fetchShipmentMethods',
    async (params, thunkAPI) => {
        const data = warehouseApi.shipmentMethod.fetchShipmentMethods(params);
        return data;
    }
);

export const fetchShipmentMethod = createAsyncThunk(
    'warehouse/fetchShipmentMethod',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.shipmentMethod.fetchShipmentMethod(id, { ...params });
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        loading: true
    },
    detail: {
        data: undefined,
        loading: true,
    }
};

const shipmentMethodSlice = createSlice({
    name: 'shipmentMethod',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchShipmentMethods.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchShipmentMethods.fulfilled]: (state, action) => {
            state.list.data = action.payload;
            state.list.loading = false;

            return;
        },
        [fetchShipmentMethods.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchShipmentMethod.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchShipmentMethod.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchShipmentMethod.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const shipmentMethodReducer = shipmentMethodSlice.reducer;

export default shipmentMethodReducer;

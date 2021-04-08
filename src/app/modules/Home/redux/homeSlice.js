import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderStatusApi from 'apis/order/orderStatusApi';
import orderTypeApi from 'apis/order/orderTypeApi';
import warehouseApi from 'apis/warehouse';
import taxApi from 'apis/product-api/taxApi';
import accountingApi from 'apis/accounting';

// status
export const fetchStatus = createAsyncThunk(
    'home/fetchStatus',
    async params => {
        const res = await orderStatusApi.fetchOrderStatus(params);
        return res;
    }
);

// type
export const fetchType = createAsyncThunk('type/fetchType', async params => {
    const res = await orderTypeApi.fetchOrderType(params);
    return res;
});

// shipment method
export const fetchShipmentMethods = createAsyncThunk(
    'warehouse/fetchShipmentMethods',
    async (params, thunkAPI) => {
        const data = warehouseApi.shipmentMethod.fetchShipmentMethods(params);
        return data;
    }
);

// tax
export const fetchTax = createAsyncThunk(
    'tax/fetchTax',
    async (params, thunkAPI) => {
        const res = await taxApi.fetchTax(params);

        return res;
    }
);

// bank
export const fetchBank = createAsyncThunk(
    'tax/fetchBank',
    async (params, thunkAPI) => {
        const res = await accountingApi.bank.fetchAll(params);
        return res;
    }
);

const initialState = {
    taxList: [],
    shipmentMethodList: [],
    typeList: [],
    statusList: [],
    bankList: []
};

const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch status
        [fetchStatus.pending]: state => {
            state.statusList = [];
        },
        [fetchStatus.fulfilled]: (state, action) => {
            state.statusList = action.payload;
        },
        // fetch type
        [fetchType.pending]: state => {
            state.typeList = [];
        },
        [fetchType.fulfilled]: (state, action) => {
            state.typeList = action.payload;
        },
        // fetch method
        [fetchShipmentMethods.pending]: state => {
            state.shipmentMethodList = [];
        },
        [fetchShipmentMethods.fulfilled]: (state, action) => {
            state.shipmentMethodList = action.payload;
        },
        // fetch tax
        [fetchTax.pending]: state => {
            state.taxList = [];
        },
        [fetchTax.fulfilled]: (state, action) => {
            state.taxList = action.payload;
        },
        // fetch bank
        [fetchBank.pending]: state => {
            state.bankList = [];
        },
        [fetchBank.fulfilled]: (state, action) => {
            state.bankList = action.payload;
        }
    }
});

export default homeSlice;

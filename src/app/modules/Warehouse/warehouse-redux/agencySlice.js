import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchAgencies = createAsyncThunk(
    'warehouse/fetchAgencies',
    async (params, thunkAPI) => {
        const data = warehouseApi.agency.fetchAgencies(params);
        return data;
    }
);

export const fetchAgency = createAsyncThunk(
    'warehouse/fetchAgency',
    async ({id, ...params}, thunkAPI) => {
        const data = warehouseApi.agency.fetchAgency(id, params);
        return data;
    }
);

const initialState = {
    list: [],
    loading: true,
    detail: {
        data: undefined,
        loading: true,
    }
};

const agencySlice = createSlice({
    name: 'agency',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAgencies.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAgencies.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.loading = false;

            return;
        },
        [fetchAgencies.rejected]: (state, action) => {
            state.list = [];
            state.loading = false;

            return;
        },
        [fetchAgency.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchAgency.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchAgency.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const agencyReducer = agencySlice.reducer;

export default agencyReducer;

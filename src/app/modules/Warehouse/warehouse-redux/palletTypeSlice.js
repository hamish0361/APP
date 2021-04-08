import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchPalletTypes = createAsyncThunk(
    'warehouse/fetchPalletTypes',
    async (params, thunkAPI) => {
        const data = warehouseApi.palletType.fetchPalletTypes(params);
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        loading: true,
    },
    detail: {
        data: undefined,
        loading: true
    }
};

const palletTypeSlice = createSlice({
    name: 'palletType',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchPalletTypes.pending]: (state, action) => {
            state.list.loading = true;

            return;
        },
        [fetchPalletTypes.fulfilled]: (state, action) => {
            state.list.data = action.payload;
            state.list.loading = false;

            return;
        },
        [fetchPalletTypes.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
    },
});

const palletTypeReducer = palletTypeSlice.reducer;

export const palletTypeAction = palletTypeSlice.actions;

export default palletTypeReducer;

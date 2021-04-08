import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchLocations = createAsyncThunk(
    'warehouse/fetchLocations',
    async (params, thunkAPI) => {
        const data = warehouseApi.location.fetchLocations(params);
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

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        resetParams(state) {
            state.list = initialState.list;
        }
    },
    extraReducers: {
        [fetchLocations.pending]: (state, action) => {
            state.list.loading = true;

            return;
        },
        [fetchLocations.fulfilled]: (state, action) => {
            state.list.data = action.payload;
            state.list.loading = false;

            return;
        },
        [fetchLocations.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
    },
});

const locationReducer = locationSlice.reducer;

export const locationAction = locationSlice.actions;

export default locationReducer;

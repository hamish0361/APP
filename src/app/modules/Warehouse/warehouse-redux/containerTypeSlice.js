import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchContainerTypes = createAsyncThunk(
    'warehouse/fetchContainerTypes',
    async (params, thunkAPI) => {
        const data = warehouseApi.containerType.fetchContainerTypes(params);
        return data;
    }
);

const initialState = {
    list: {
        data: [],
        loading: true,
    },
};

const containerTypeSlice = createSlice({
    name: 'containerType',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchContainerTypes.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchContainerTypes.fulfilled]: (state, action) => {
            state.list.data = action.payload;

            state.list.loading = false;

            return;
        },
        [fetchContainerTypes.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
    },
});

const containerTypeReducer = containerTypeSlice.reducer;

export const containerTypeAction = containerTypeSlice.actions;

export default containerTypeReducer;

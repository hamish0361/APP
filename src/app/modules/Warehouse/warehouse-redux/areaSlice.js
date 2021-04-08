import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchAreas = createAsyncThunk(
    'warehouse/fetchAreas',
    async (params, thunkAPI) => {
        const data = warehouseApi.area.fetchAreas(params);
        return data;
    }
);

export const fetchArea = createAsyncThunk(
    'warehouse/fetchArea',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.area.fetchArea(id, { ...params });
        return data;
    }
);

const initialState = {
    list: [],
    loading: true,
    detail: {
        data: undefined,
        loading: true,
    },
};

const areaSlice = createSlice({
    name: 'area',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAreas.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAreas.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.loading = false;

            return;
        },
        [fetchAreas.rejected]: (state, action) => {
            state.list = [];
            state.loading = false;

            return;
        },
        [fetchArea.fulfilled]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchArea.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchArea.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const areaReducer = areaSlice.reducer;

export const areaAction = areaSlice.actions;

export default areaReducer;

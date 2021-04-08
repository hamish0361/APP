import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchBoxs = createAsyncThunk(
    'warehouse/fetchBoxs',
    async (params, thunkAPI) => {
        const data = warehouseApi.box.fetchBoxs(params);
        return data;
    }
);

export const fetchBox = createAsyncThunk(
    'warehouse/fetchBox',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.box.fetchBox(id, { ...params });
        return data;
    }
);

export const update = createAsyncThunk(
    'warehouse/update',
    async ({ id, body }, thunkAPI) => {
        const data = warehouseApi.box.update(id, body);
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
            lastPage: 0
        },
        filter: {
            field: undefined,
            operator: undefined,
            value: undefined
        },
        loading: true
    },
    detail: {
        data: undefined,
        loading: true
    }
};

const boxSlice = createSlice({
    name: 'box',
    initialState,
    reducers: {
        changePagination(state, action) {
            state.list.pagination.page = action.payload.page;
        },
        changeFilter(state, action) {
            state.list.filter = action.payload;
        },
        resetParams(state) {
            state.list = { ...initialState.list };
        },
        setBoxDetailData(state, action) {
            state.detail.data = action.payload;
        },
    },
    extraReducers: {
        [fetchBoxs.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchBoxs.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.loading = false;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;

            return;
        },
        [fetchBoxs.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchBox.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchBox.fulfilled]: (state, action) => {
            state.detail.data = action.payload;

            state.detail.loading = false;

            return;
        },
        [fetchBox.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
        [update.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [update.fulfilled]: (state, action) => {
            state.detail.loading = false;
            return;
        },
        [update.rejected]: (state, action) => {
            state.detail.loading = false;
            return;
        }
    }
});

const boxReducer = boxSlice.reducer;
export const boxAction = boxSlice.actions;

export default boxReducer;

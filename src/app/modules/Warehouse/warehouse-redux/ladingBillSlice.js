import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchLadingBills = createAsyncThunk(
    'warehouse/fetchLadingBills',
    async (params, thunkAPI) => {
        const data = warehouseApi.ladingBill.fetchLadingBills({ orderBy: 'created_at', sortedBy: 'desc', ...params });
        return data;
    }
);

export const fetchLadingBill = createAsyncThunk(
    'warehouse/fetchLadingBill',
    async ({id, ...params}, thunkAPI) => {
        const data = warehouseApi.ladingBill.fetchLadingBill(id, {...params});
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
            lastPage: 0
        },
        loading: true,
    },
    detail: {
        data: undefined,
        loading: true,
    }
};

const ladingBillSlice = createSlice({
    name: 'ladingBill',
    initialState,
    reducers: {
        setPage(state, action) {
            state.list.pagination.page = action.payload;
        },
        resetParams(state) {
            state.list = initialState.list;
        }
    },
    extraReducers: {
        [fetchLadingBills.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchLadingBills.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;
            state.list.loading = false;

            return;
        },
        [fetchLadingBills.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchLadingBill.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchLadingBill.fulfilled]: (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;

            return;
        },
        [fetchLadingBill.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const ladingBillReducer = ladingBillSlice.reducer;

export const ladingBillAction = ladingBillSlice.actions;

export default ladingBillReducer;

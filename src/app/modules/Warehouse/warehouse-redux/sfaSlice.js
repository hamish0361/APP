import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';
import _ from 'lodash';

export const fetchSFAs = createAsyncThunk(
    'warehouse/fetchSFAs',
    async (params, thunkAPI) => {
        const data = warehouseApi.SFA.fetchSFAs({ orderBy: 'created_at', sortedBy: 'desc', ...params });
        return data;
    }
);

export const fetchSFA = createAsyncThunk(
    'warehouse/fetchSFA',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.SFA.fetchSFA(id, { ...params });
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
        filter: {
            search: undefined,
        },
        loading: true,
    },
    detail: {
        data: undefined,
        loading: true,
    }
};

const sfaSlice = createSlice({
    name: 'sfa',
    initialState,
    reducers: {
        changePagination(state, action) {
            state.list.pagination.page = action.payload.page;
        },
        changeSearchText(state, action) {
            state.list.filter = { search: action.payload };
        },
        changeFilterAgency(state, action) {
            if (action.payload !== undefined)
                state.list.filter = { search: `agency_id:${action.payload}` };
            else state.list.filter = { search: undefined };
        },
        setSFADetailData(state, action) {
            state.detail.data = action.payload;
        },
        resetParams(state) {
            state.list = initialState.list;
        },
        addBoxToDetailSFABoxes(state, action) {
            if(state.detail?.data?.boxes) {
                const matchedBoxIdx = _.findIndex(state.detail.data.boxes, ['id', action.payload?.id]);

                if(matchedBoxIdx === -1) state.detail.data.boxes.push(action.payload);
                else state.detail.data.boxes[matchedBoxIdx] = action.payload;
            }
        }
    },
    extraReducers: {
        [fetchSFAs.pending]: (state, action) => {
            state.list.loading = true;
        },
        [fetchSFAs.fulfilled]: (state, action) => {
            state.list.data = action.payload.data;

            state.list.loading = false;
            state.list.pagination.limit = action.payload.per_page;
            state.list.pagination.total = action.payload.total;
            state.list.pagination.lastPage = action.payload.last_page;

            return;
        },
        [fetchSFAs.rejected]: (state, action) => {
            state.list.data = [];
            state.list.loading = false;

            return;
        },
        [fetchSFA.pending]: (state, action) => {
            state.detail.loading = true;
        },
        [fetchSFA.fulfilled]: (state, action) => {
            state.detail.data = action.payload;

            state.detail.loading = false;

            return;
        },
        [fetchSFA.rejected]: (state, action) => {
            state.detail.data = undefined;
            state.detail.loading = false;

            return;
        },
    },
});

const sfaReducer = sfaSlice.reducer;
export const sfaAction = sfaSlice.actions;

export default sfaReducer;

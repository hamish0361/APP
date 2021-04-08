import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';

export const fetchShelveFromArea = createAsyncThunk(
    'warehouse/fetchShelveFromArea',
    async (params, thunkAPI) => {
        const data = warehouseApi.area.fetchAreas({ with: 'shelves' });
        return data;
    }
);

export const fetchShelvesForWHModel = createAsyncThunk(
    'warehouse/fetchShelvesForWHModel',
    async (params, thunkAPI) => {

        const filter = thunkAPI.getState().warehouse.whModel.filter;

        const filterParams = {
            search: '',
            searchFields: '',
            with: 'area',
        };

        Object.entries(filter).forEach(([filterKey, filterValue]) => {
            if (filterValue) {
                filterParams.search += `${filterKey}:${filterValue};`;
                filterParams.searchFields += `${filterKey}:like;`;
                filterParams.searchJoin = 'and';
            }
        });

        const data = warehouseApi.shelve.fetchShelves(filterParams);
        return data;
    }
);

const initialState = {
    shelves: [],
    loading: false,
    filter: {}
};

const whModelSlice = createSlice({
    name: 'whModel',
    initialState,
    reducers: {
        changeFilter(state, action) {
            state.filter = { ...state.filter, ...action.payload };
        },
        resetFilter(state) {
            state.filter = {};
        }
    },
    extraReducers: {
        [fetchShelveFromArea.pending]: (state) => {
            state.loading = true;
        },
        [fetchShelveFromArea.fulfilled]: (state, action) => {
            state.loading = false;
            state.shelves = action.payload.reduce((prevV, curV) => {
                let listShelves = curV.shelves.map(i => ({ ...i, areaName: curV.name }));

                return [...prevV, ...listShelves];
            }, []);

            return;
        },
        [fetchShelveFromArea.rejected]: (state, action) => {
            state.shelves = [];
            state.loading = false;

            return;
        },
        [fetchShelvesForWHModel.pending]: (state) => {
            state.loading = true;
        },
        [fetchShelvesForWHModel.fulfilled]: (state, action) => {
            state.loading = false;
            state.shelves = action.payload.data.map(s => ({ ...s, areaName: s?.area?.name || '' }));

            return;
        },
        [fetchShelvesForWHModel.rejected]: (state, action) => {
            state.shelves = [];
            state.loading = false;

            return;
        },
    },
});

const whModelReducer = whModelSlice.reducer;

export const whModelAction = whModelSlice.actions;

export default whModelReducer;

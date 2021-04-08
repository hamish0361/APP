import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import unitApi from 'apis/product-api/unitApi';

//get unit list
export const fetchUnit = createAsyncThunk(
    'unit/fetchUnit',
    async (params, thunkAPI) => {
        const res = await unitApi.fetchUnit(params);
        return res;
    }
);

//create unit
export const createUnit = createAsyncThunk(
    'unit/createUnit',
    async (params, thunkAPI) => {
        const res = await unitApi.createUnit(params);
        return res;
    }
);

//get unit by id
export const fetchUnitById = createAsyncThunk(
    'unit/fetchUnitById',
    async (params, thunkAPI) => {
        const res = await unitApi.fetchUnitById(params);
        return res;
    }
);

//delete unit
export const deleteUnit = createAsyncThunk(
    'unit/deleteUnit',
    async (params, thunkAPI) => {
        const res = await unitApi.deleteUnit(params);
        return res;
    }
);

//update info unit
export const updateUnit = createAsyncThunk('unit/updateUnit', async body => {
    const res = await unitApi.updateUnit(body.id, body.params);
    return res;
});
const initialSate = {
    unitList: [],
    unitDetail: {},
    loading: false,
    isActionLoading: false,
    error: ''
};

const unitSlice = createSlice({
    name: 'unit',
    initialState: initialSate,
    reducers: {},
    extraReducers: {
        //fetch unit
        [fetchUnit.pending]: (state, action) => {
            state.loading = true;
            state.unitList = [];
        },
        [fetchUnit.fulfilled]: (state, action) => {
            state.loading = false;
            state.unitList = action.payload;
        },
        [fetchUnit.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        //fetch unit id
        [fetchUnitById.pending]: (state, action) => {
            state.loading = true;
            state.unitDetail = {};
        },
        [fetchUnitById.fulfilled]: (state, action) => {
            state.loading = false;
            state.unitDetail = action.payload;
        },
        [fetchUnitById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // delete tax
        [deleteUnit.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [deleteUnit.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteUnit.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create tax
        [createUnit.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createUnit.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createUnit.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update tax
        [updateUnit.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updateUnit.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateUnit.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

const unitReducer = unitSlice.reducer;

export default unitReducer;

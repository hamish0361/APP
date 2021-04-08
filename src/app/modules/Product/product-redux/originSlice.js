import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import originApi from 'apis/product-api/originApi';

//get origin list
export const fetchOrigin = createAsyncThunk(
    'origin/fetchOrigin',
    async (params, thunkAPI) => {
        const res = await originApi.fetchOrigin(params);
        return res;
    }
);

//create origin
export const createOrigin = createAsyncThunk(
    'origin/createOrigin',
    async (params, thunkAPI) => {
        try {
            const res = await originApi.createOrigin(params);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

//get origin by id
export const fetchOriginById = createAsyncThunk(
    'origin/fetchOriginById',
    async params => {
        const res = await originApi.fetchOriginById(params);
        return res;
    }
);

//delete origin
export const deleteOrigin = createAsyncThunk(
    'origin/deleteOrigin',
    async (params, thunkAPI) => {
        try {
            const res = await originApi.deleteOrigin(params);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const updateOrigin = createAsyncThunk(
    'origin/updateOrigin',
    async (body, thunkAPI) => {
        try {
            const res = await originApi.updateOrigin(body);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const initialSate = {
    originList: [],
    originDetail: {},
    isLoading: true,
    isActionLoading: false,
    error: ''
};

const originSlice = createSlice({
    name: 'origin',
    initialState: initialSate,
    reducers: {},
    extraReducers: {
        // fetch
        [fetchOrigin.pending]: state => {
            state.isLoading = true;
            state.originList = [];
        },
        [fetchOrigin.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.originList = action.payload;
        },
        [fetchOrigin.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch by id
        [fetchOriginById.pending]: (state, action) => {
            state.isLoading = true;
            state.originDetail = {};
        },
        [fetchOriginById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.originDetail = action.payload;
        },
        [fetchOriginById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // delete origin
        [deleteOrigin.pending]: (state, action) => {
            state.isActionLoading = true;
        },
        [deleteOrigin.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteOrigin.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create origin
        [createOrigin.pending]: (state, action) => {
            state.isActionLoading = true;
        },
        [createOrigin.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createOrigin.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update origin
        [updateOrigin.pending]: (state, action) => {
            state.isActionLoading = true;
        },
        [updateOrigin.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateOrigin.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

const originReducer = originSlice.reducer;

export default originReducer;

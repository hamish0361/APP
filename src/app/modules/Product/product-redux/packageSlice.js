import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import packageApi from 'apis/product-api/packageApi';

//get package list
export const fetchPackage = createAsyncThunk(
    'package/fetchPackage',
    async (params, thunkAPI) => {
        const res = await packageApi.fetchPackage(params);

        return res;
    }
);

//create package
export const createPackage = createAsyncThunk(
    'package/createPackage',
    async (params, thunkAPI) => {
        const res = await packageApi.createPackage(params);

        return res;
    }
);

//get package by id
export const fecthPackageById = createAsyncThunk(
    'package/fecthPackageById',
    async (body, thunkAPI) => {
        const res = await packageApi.fetchPackageById(body);

        return res;
    }
);

//delete package
export const deletePackage = createAsyncThunk(
    'package/deletePackage',
    async id => {
        await packageApi.deletePackage(id);

        return {};
    }
);

//update info package
export const updatePackage = createAsyncThunk(
    'package/updatePackage',
    async (body, thunkAPI) => {
        const res = await packageApi.updatePackage(body.id, body.params);

        return res;
    }
);

const initialSate = {
    packageList: [],
    paginations: {
        current_page: 1,
        per_page: 10,
        total: 0,
        lastPage: 0
    },
    loading: false,
    isActionLoading: false,
    error: '',
    packageDetail: {}
};

const packageSlice = createSlice({
    name: 'package',
    initialState: initialSate,
    reducers: {
        changePaginationPage(state, action) {
            state.paginations.current_page = action.payload;
        }
    },
    extraReducers: {
        //fetch package
        [fetchPackage.pending]: state => {
            state.loading = true;
            state.packageList = [];
            state.error = '';
        },
        [fetchPackage.fulfilled]: (state, action) => {
            state.loading = false;
            state.packageList = action.payload.data;
            state.paginations = {
                current_page: action.payload.current_page,
                per_page: 10,
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchPackage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        //fetch by id
        [fecthPackageById.pending]: (state, action) => {
            state.loading = true;
            state.packageDetail = {};
        },
        [fecthPackageById.fulfilled]: (state, action) => {
            state.loading = false;
            state.packageDetail = action.payload;
        },
        [fecthPackageById.rejected]: (state, action) => {
            state.error = action.error;
        },
        //delete package
        [deletePackage.pending]: state => {
            state.isActionLoading = true;
        },
        [deletePackage.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deletePackage.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //create package
        [createPackage.pending]: state => {
            state.isActionLoading = true;
        },
        [createPackage.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createPackage.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //update package
        [updatePackage.pending]: state => {
            state.isActionLoading = true;
        },
        [updatePackage.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updatePackage.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        }
    }
});

export const { changePaginationPage } = packageSlice.actions;

const packageReducer = packageSlice.reducer;

export default packageReducer;

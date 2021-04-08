import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supplierApi from 'apis/product-api/supplierApi';

//get supplier list
export const fetchSupplier = createAsyncThunk(
    'supplier/fetchSupplier',
    async (params, thunkAPI) => {
        const res = await supplierApi.fetchSupplier(params);

        return res;
    }
);

//create supplier
export const createSupplier = createAsyncThunk(
    'supplier/createSupplier',
    async (params, thunkAPI) => {
        const res = await supplierApi.createSupplier(params);

        return res;
    }
)

//get supplier id
export const fecthSupplierId = createAsyncThunk(
    'supplier/fecthSupplierId',
    async (params, thunkAPI) => {
        const res = await supplierApi.fetchSupplierById(params)

        return res;
    }
)

//delete supplier
export const deleteSupplier = createAsyncThunk(
    'supplier/deleteSupplier',
    async (params, thunkAPI) => {
        await supplierApi.deleteSupplier(params);

        return {};
    }
);

//update info supplier
export const updateSupplier = createAsyncThunk(
    'supplier/updateSupplier',
    async (body, thunkAPI) => {
        const res = await supplierApi.updateSupplier(body.id, body.params);

        return res;
    }
);

const initialSate = {
    supplierList: [],
    paginations: {
        current_page: 1,
        per_page: 0,
        total: 0,
        lastPage: 0,
    },
    loading: false,
    isActionLoading: false,
    supplierDetail: {},
    error: ''
};

const supplierSlice = createSlice({
    name: 'supplier',
    initialState: initialSate,
    reducers: {
        changePaginationPage(state, action) {
            state.paginations.current_page = action.payload;
        }
    },
    extraReducers: {
        //fetch supplier
        [fetchSupplier.pending]: (state, action) => {
            state.loading = true;
            state.supplierList = []
        },
        [fetchSupplier.fulfilled]: (state, action) => {
            state.loading = false
            state.supplierList = action.payload.data;
            state.paginations = {
                current_page: action.payload.current_page,
                per_page: action.payload.per_page,
                total: action.payload.total,
                lastPage: action.payload.last_page,
            };
        },
        [fetchSupplier.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
        },
        //fetch supplier id
        [fecthSupplierId.pending]: (state, action) => {
            state.loading = true;
            state.supplierDetail = {}
        },
        [fecthSupplierId.fulfilled]: (state, action) => {
            state.loading = false;
            state.supplierDetail = action.payload;
        },
        [fecthSupplierId.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
        },
        // delete supplier
        [deleteSupplier.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [deleteSupplier.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteSupplier.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create supplier
        [createSupplier.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createSupplier.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createSupplier.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update supplier
        [updateSupplier.pending]: (state, action) => {
            state.isActionLoading = true;
            state.error = '';
        },
        [updateSupplier.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateSupplier.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }

    },
});

export const {
    changePaginationPage,
} = supplierSlice.actions

const supllierReducer = supplierSlice.reducer;

export default supllierReducer;

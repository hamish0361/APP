import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from 'apis/product-api/productApi';

//get product list
export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (params, thunkAPI) => {
        const res = await productApi.fetchProduct(params);
        return res;
    }
);

//create product
export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (params, thunkAPI) => {
        const res = await productApi.createProduct(params);
        return res;
    }
);

//create product image file
export const createProductImageFile = createAsyncThunk(
    'product/createProductImageFile',
    async (body, thunkAPI) => {
        const res = await productApi.createProductImageFile(
            body.params,
            body.data
        );
        return res;
    }
);

//get product by id
export const fecthProductId = createAsyncThunk(
    'product/fecthProductId',
    async (body, thunkAPI) => {
        const res = await productApi.fetchProductById(body);
        return res;
    }
);

//get supplier from product
export const fecthProductWithSupplier = createAsyncThunk(
    'product/fecthProductWithSupplier',
    async (params, thunkAPI) => {
        const res = await productApi.fetchProductWithSupplier(params);

        return res;
    }
);

//delete product
export const deleteProduct = createAsyncThunk(
    'product/deleteproduct',
    async params => {
        const res = await productApi.deleteProduct(params);
        return res;
    }
);

//delete supplier from product
export const deleteSupplierProduct = createAsyncThunk(
    'product/deleteSupplierProduct',
    async (body, thunkAPI) => {
        const res = await productApi.deleteSupplierProduct(
            body.id,
            body.params
        );

        return res;
    }
);

//update info product
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (body, thunkAPI) => {
        try {
            const res = await productApi.updateProduct(body.id, body.params);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//update supplier for product
export const updateSupplierProduct = createAsyncThunk(
    'product/updateSupplierProduct',
    async (body, thunkAPI) => {
        try {
            const res = await productApi.updateSupplierProduct(
                body.id,
                body.params
            );
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//update price of supplier from product
export const updatePriceSupplier = createAsyncThunk(
    'product/updatePriceSupplier',
    async (params, thunkAPI) => {
        try {
            const res = await productApi.updatePriceSupplier(params);

            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//upload image of product
export const uploadImageProduct = createAsyncThunk(
    'product/uploadImageProduct',
    async (params, thunkAPI) => {
        try {
            const res = await productApi.uploadImageProduct(
                params.idProduct,
                params.data
            );

            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//fetch inventory page
export const fetchIventory = createAsyncThunk(
    'product/fetchIventory',
    async (params, thunkAPI) => {
        const res = await productApi.fetchIventory(params);
        return res;
    }
);

const initialSate = {
    productList: [],
    iventoryList: [],
    pagination: {
        total: 0,
        lastPage: 0
    },
    paginationIventory: {
        total: 0,
        lastPage: 0
    },
    loading: false,
    isActionLoading: false,
    loadingIventory: false,
    productDetail: undefined,
    error: ''
};

const productSlice = createSlice({
    name: 'product',
    initialState: initialSate,
    reducers: {
        changePaginationPage(state, action) {
            state.pagination.current_page = action.payload;
            state.paginationIventory.current_page = action.payload;
        },
        initProduct: state => {
            state.productList = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
        }
    },
    extraReducers: {
        //fetch product
        [fetchProduct.pending]: state => {
            state.loading = true;
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.productList = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchProduct.rejected]: (state, action) => {
            state.error = action.error;
        },
        //fetch iventory
        [fetchIventory.pending]: state => {
            state.loadingIventory = true;
            state.iventoryList = [];
        },
        [fetchIventory.fulfilled]: (state, action) => {
            state.loadingIventory = false;
            state.iventoryList = action.payload.data;
            state.paginationIventory = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchIventory.rejected]: (state, action) => {
            state.error = action.error;
        },
        // fetch by id
        [fecthProductId.pending]: state => {
            state.loading = true;
            state.productDetail = undefined;
        },
        [fecthProductId.fulfilled]: (state, action) => {
            state.loading = false;
            state.productDetail = action.payload;
        },
        [fecthProductId.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        //delete product
        [deleteProduct.pending]: state => {
            state.isActionLoading = true;
        },

        [deleteProduct.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //create product
        [createProduct.pending]: state => {
            state.isActionLoading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createProduct.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //create product
        [createProductImageFile.pending]: state => {
            state.isActionLoading = true;
        },
        [createProductImageFile.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createProductImageFile.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //update product
        [updateProduct.pending]: state => {
            state.isActionLoading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateProduct.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //update supplier product
        [updateSupplierProduct.pending]: state => {
            state.isActionLoading = true;
        },
        [updateSupplierProduct.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateSupplierProduct.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //update price supplier
        [updatePriceSupplier.pending]: state => {
            state.isActionLoading = true;
        },
        [updatePriceSupplier.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updatePriceSupplier.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        },
        //update image  product
        [uploadImageProduct.pending]: state => {
            state.isActionLoading = true;
        },
        [uploadImageProduct.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [uploadImageProduct.rejected]: (state, action) => {
            state.error = action.error;
            state.isActionLoading = false;
        }
    }
});

export const { changePaginationPage, initProduct } = productSlice.actions;
export default productSlice;

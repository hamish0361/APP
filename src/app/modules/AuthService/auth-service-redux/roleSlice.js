import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roleApi from 'apis/auth/roleApi';

// fetch order
export const fetchRoles = createAsyncThunk(
    'authService/fetchRoles',
    async (thunkAPI) => {
        const res = await roleApi.fetchRoles({with: 'fullChilds'});
        return res;
    }
);

export const createRoles = createAsyncThunk(
    'authService/createRoles',
    async (params, thunkAPI) => {
        const res = await roleApi.createRoles(params);

        if (params.parent_id && params.parent_id !== '') {
            await roleApi.attachRoles({
                id: params.parent_id,
                params: ["childs", params.id]
            });
        }
        
        const user = thunkAPI.getState().auth.user;

        thunkAPI.dispatch(fetchRolesById(user.role));
        return res;
    }
);

export const fetchRolesById = createAsyncThunk(
    'authService/fetchRolesById',
    async (role, thunkAPI) => {
        const res = await roleApi.fetchRolesById(role, {with: 'fullChilds'});
        return res;
    }
);

export const fetchChildByRole = createAsyncThunk(
    'authService/fetchChildsByRole',
    async (role, thunkAPI) => {
        const res = await roleApi.fetchDataByRole(role, { with: 'childs' });
        return res;
    }
);


const initialState = {
    roleList: [],
    roleListBydId: [],
    roleDetail: undefined,
    childListByRole: [],
    isLoading: true,
    isActionLoading: false,
    error: '',
    roleSuccess: false
};

export const roleSlice = createSlice({
    name: 'role',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch order
        [fetchRoles.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchRoles.fulfilled]: (state, action) => {
            state.roleList = action.payload;
            state.isLoading = false;
        },
        [fetchRoles.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
        [createRoles.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [createRoles.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.roleSuccess = true;
        },
        [createRoles.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
            state.roleSuccess = false;
        },
        [fetchRolesById.pending]: state => {
            state.isLoading = true;
            state.roleListBydId = [];
            state.error = '';
        },
        [fetchRolesById.fulfilled]: (state, action) => {
            state.roleListBydId = [action.payload];
            state.isLoading = false;
        },
        [fetchRolesById.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
        [fetchChildByRole.pending]: state => {
            state.isLoading = true;
            state.childListByRole = [];
            state.error = '';
        },
        [fetchChildByRole.fulfilled]: (state, action) => {
            state.childListByRole = action.payload.childs || [];
            state.isLoading = false;
        },
        [fetchChildByRole.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        }
    }
});

export default roleSlice;

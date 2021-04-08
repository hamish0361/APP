import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import permissionApi from 'apis/auth/permissionApi';
import roleApi from 'apis/auth/roleApi';


export const fetchPermissionByRole = createAsyncThunk(
    'authService/fetchPermissionsByRole',
    async (role, thunkAPI) => {
        const res = await roleApi.fetchDataByRole(role, { with: 'permissions' });
        return res;
    }
);

export const fetchPermissions = createAsyncThunk(
    'authService/fetchPermissions',
    async (params, thunkAPI) => {
        const res = await permissionApi.fetchPermissions(params);
        return res;
    }
);

export const createPermissions = createAsyncThunk(
    'authService/createPermissions',
    async (params, thunkAPI) => {
        const res = await permissionApi.createPermissions(params);

        if (params.parent_id && params.parent_id !== '') {
            await permissionApi.attachPermissions({
                id: params.parent_id,
                params: ["childs", params.id]
            });
        }

        thunkAPI.dispatch(fetchPermissions({ with: 'fullChilds' }));
        return res;
    }
);

export const updatePermissions = createAsyncThunk(
    'authService/updatePermissions',
    async (body, thunkAPI) => {
        const res = await permissionApi.updatePermissions(body.params, body.id);
        thunkAPI.dispatch(fetchPermissions({ with: 'fullChilds' }));
        return res;
    }
);

export const deletePermissions = createAsyncThunk(
    'authService/deletePermissions',
    async (id, thunkAPI) => {
        const res = await permissionApi.deletePermissions(id);
        thunkAPI.dispatch(fetchPermissions({ with: 'fullChilds' }));
        return res;
    }
);

const initialState = {
    permissionList: [],
    permissionListByRole: [],
    isLoading: true,
    isActionLoading: false,
    error: '',
};

export const roleSlice = createSlice({
    name: 'role',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // fetch order
        [fetchPermissionByRole.pending]: state => {
            state.isLoading = true;
            state.permissionListByRole = [];
            state.error = '';
        },
        [fetchPermissionByRole.fulfilled]: (state, action) => {
            state.permissionListByRole = action.payload.permissions;
            state.isLoading = false;
        },
        [fetchPermissionByRole.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
        [fetchPermissions.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchPermissions.fulfilled]: (state, action) => {
            state.permissionList = action.payload || [];
            state.isLoading = false;
        },
        [fetchPermissions.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        }
    }
});

export default roleSlice;

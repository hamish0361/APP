import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupApi from "apis/order/groupApi";

// fetch group
export const fetchGroup = createAsyncThunk(
  "group/fetchGroup",
  async (params) => {
    const res = await groupApi.fetchGroup(params);
    return res;
  }
);

// create group
export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (params, thunkAPI) => {
    const res = await groupApi.createGroup(params);
    thunkAPI.dispatch(fetchGroup());
    return res;
  }
);

// update group
export const updateGroup = createAsyncThunk(
  "group/updateGroup",
  async (body) => {
    const res = await groupApi.updateGroup(body.id, body.params);
    return res;
  }
);

// delete group
export const deleteGroup = createAsyncThunk(
  "group/deleteGroup",
  async (id, thunkAPI) => {
    const res = await groupApi.deleteGroup(id);
    thunkAPI.dispatch(fetchGroup());
    return res;
  }
);

// fetch group role
export const fetchGroupRole = createAsyncThunk(
  "group/fetchGroupRole",
  async (params) => {
    const res = await groupApi.fetchGroupRole(params);
    return res;
  }
);

// delete group role
export const deleteGroupRole = createAsyncThunk(
  "group/deleteGroupRole",
  async (id, thunkAPI) => {
    const res = await groupApi.deleteGroupRole(id);
    thunkAPI.dispatch(fetchGroupRole());
    return res;
  }
);

const initialState = {
  groupList: [],
  groupRoleList: [],
  loading: true,
  error: "",
};

const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // fetch group
    [fetchGroup.pending]: (state) => {
      state.loading = true;
      state.error = "";
      state.groupList = [];
    },
    [fetchGroup.fulfilled]: (state, action) => {
      state.loading = false;
      state.groupList = action.payload;
    },
    [fetchGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    //fetch role
    [fetchGroupRole.pending]: (state) => {
      state.loading = true;
      state.error = "";
      state.groupRoleList = [];
    },
    [fetchGroupRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.groupRoleList = action.payload;
    },
    [fetchGroupRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete group
    [deleteGroup.pending]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [deleteGroup.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete role
    [deleteGroupRole.pending]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [deleteGroupRole.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteGroupRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default groupSlice;

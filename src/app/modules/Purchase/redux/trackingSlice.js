import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import trackingApi from 'apis/order/trackingApi';
import _ from 'lodash';

// fetch
export const fetchTracking = createAsyncThunk(
    'tracking/fetchTracking',
    async params => {
        const res = await trackingApi.fetchTracking(params);
        return res;
    }
);

// fetch by id
export const fetchTrackingById = createAsyncThunk(
    'tracking/fetchTrackingById',
    async body => {
        const { id, params } = body;
        const res = await trackingApi.fetchTrackingById(id, params);
        return res;
    }
);

// create
export const createTracking = createAsyncThunk(
    'tracking/createTracking',
    async (body, thunkAPI) => {
        const res = await trackingApi.createTracking(body);
        return res;
    }
);
// create
export const createTrackingForOrder = createAsyncThunk(
    'tracking/createTrackingForOrder',
    async (params, thunkAPI) => {
        const res = await trackingApi.createTrackingForOrder(
            params.id,
            params.body
        );
        return res;
    }
);

// update
export const updateTracking = createAsyncThunk(
    'tracking/updateTracking',
    async body => {
        const { id, params } = body;
        const res = await trackingApi.updateTracking(id, params);
        return res;
    }
);

// delete
export const deleteTracking = createAsyncThunk(
    'tracking/deleteTracking',
    async (id, thunkAPI) => {
        const res = await trackingApi.deleteTracking(id);
        thunkAPI.dispatch(fetchTracking());
        return res;
    }
);

const initialState = {
    trackingList: [],
    trackingDetail: undefined,
    isLoading: true,
    isActionLoading: false,
    error: '',
    pagination: {
        total: 0,
        lastPage: 0
    }
};

const trackingSlice = createSlice({
    name: 'tracking',
    initialState: initialState,
    reducers: {
        resetTrackings: state => {
            state.trackingList = [];
            state.pagination = {
                total: 0,
                lastPage: 0
            };
        },
        updateTrackingItem(state, action) {
            const matchTrackingIdx = _.findIndex(state.trackingList, [
                'id',
                action.payload?.id
            ]);

            if (matchTrackingIdx !== -1) {
                state.trackingList[matchTrackingIdx] = action.payload;
            }
        }
    },
    extraReducers: {
        // fetch
        [fetchTracking.pending]: state => {
            state.isLoading = true;
            state.error = '';
        },
        [fetchTracking.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.trackingList = action.payload.data;
            state.pagination = {
                total: action.payload.total,
                lastPage: action.payload.last_page
            };
        },
        [fetchTracking.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch by id
        [fetchTrackingById.pending]: state => {
            state.isLoading = true;
            state.trackingDetail = undefined;
            state.error = '';
        },
        [fetchTrackingById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.trackingDetail = action.payload;
        },
        [fetchTrackingById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // delete
        [deleteTracking.pending]: state => {
            state.isActionLoading = true;
        },
        [deleteTracking.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [deleteTracking.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // update purchase
        [updateTracking.pending]: state => {
            state.isActionLoading = true;
        },
        [updateTracking.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [updateTracking.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // create
        [createTracking.pending]: state => {
            state.isActionLoading = true;
        },
        [createTracking.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createTracking.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        },
        // createTrackingForOrder
        [createTrackingForOrder.pending]: state => {
            state.isActionLoading = true;
        },
        [createTrackingForOrder.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createTrackingForOrder.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export const { resetTrackings } = trackingSlice.actions;

const trackingAction = trackingSlice.actions;

export { trackingAction };

export default trackingSlice;

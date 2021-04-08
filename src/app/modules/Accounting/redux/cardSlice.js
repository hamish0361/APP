import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountingApi from 'apis/accounting';

export const fetchCard = createAsyncThunk('card/fetchCard', async params => {
    const res = await accountingApi.card.fetchAll(params);
    return res;
});

// fetch order type by id
export const fetchCardById = createAsyncThunk(
    'card/fetchCardById',
    async body => {
        const { id, params } = body;
        const res = await accountingApi.card.fetchById(id, params);
        return res;
    }
);

export const createCard = createAsyncThunk('card/createCard', async body => {
    const res = await accountingApi.card.create(body);
    return res;
});

const initialState = {
    list: [],
    detail: undefined,
    isLoading: true,
    isActionLoading: false
};

const cardSlice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        resetPaymentMethod: state => {
            state.list = [];
        }
    },
    extraReducers: {
        // fetch
        [fetchCard.pending]: state => {
            state.isLoading = true;
        },
        [fetchCard.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list = action.payload;
        },
        [fetchCard.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // fetch by id
        [fetchCardById.pending]: state => {
            state.isLoading = true;
            state.detail = undefined;
        },
        [fetchCardById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.detail = action.payload;
        },
        [fetchCardById.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        // create
        [createCard.pending]: state => {
            state.isActionLoading = true;
            state.error = '';
        },
        [createCard.fulfilled]: (state, action) => {
            state.isActionLoading = false;
        },
        [createCard.rejected]: (state, action) => {
            state.isActionLoading = false;
            state.error = action.error;
        }
    }
});

export default cardSlice;

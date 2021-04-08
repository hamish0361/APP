import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';
import { boxMessageFormatter } from 'helper/whIOMessageFormatter';
import _ from 'lodash';

export const pickGoodsDelivery = createAsyncThunk(
    'warehouse/pickGoodsDelivery',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.goodsDelivery.fetchGoodsDelivery(id, {
            with: 'pivotBoxes.boxLadingBill.owningBox;outBoundPickers',
            ...params
        });
        return data;
    }
);

export const pickBox = createAsyncThunk(
    'warehouse/pickBox',
    async (box_id, thunkAPI) => {

        const goodsDelivery = thunkAPI.getState().warehouse.outBoundPicker.goodsDelivery.data;

        const data = warehouseApi.outBoundPicker.create({
            goods_delivery_id: goodsDelivery.id,
            box_id,
            quantity: 1
        });
        return data;
    }
);

const initialState = {
    goodsDelivery: {
        data: undefined,
        loading: false
    },
    process: {
        message: [],
        loading: false
    }
};

const outBoundPickerSlice = createSlice({
    name: 'outBoundPicker',
    initialState,
    reducers: {
        setPage(state, action) {
            state.list.pagination.page = action.payload;
        },
        removeBoxByPickerId(state, action) {
            let pickerId = action.payload;
            let pickerRemoved = _.find(state.process.message, ['id', pickerId]);

            if (!pickerRemoved) return;

            state.process.message = state.process.message.filter(m => m.id !== pickerId);

            /** Remove in goodsDelivery */
            state.goodsDelivery.data.out_bound_pickers = state.goodsDelivery.data.out_bound_pickers.filter(m => m.id !== pickerId);
        },
        updateBoxQuantity(state, action) {
            let { newQuantity, ...message } = action.payload;

            let messageIdx = _.findIndex(state.process.message, ['id', message.id]);

            if (messageIdx === -1) return;

            /** Update in list message */
            state.process.message[messageIdx].quantity = newQuantity;

            /** Update in goodsDelivery */
                state.goodsDelivery.data.out_bound_pickers = state.goodsDelivery.data.out_bound_pickers.map(ip => {
                    if (ip.id === message.id) return { ...ip, quantity: newQuantity }

                    return ip;
                });
        }
    },
    extraReducers: {
        [pickBox.pending]: (state, action) => {
            state.process.loading = true;

            return;
        },
        [pickBox.fulfilled]: (state, action) => {
            state.process.loading = false;

            let box_id = action.payload.box_id;

            /** Push message thông báo */
            state.process.message = state.process.message.filter(m => m.id !== action.payload.id);
            state.process.message.unshift(
                boxMessageFormatter({
                    box_id,
                    messageId: action.payload.id,
                    quantity: action.payload.quantity
                })
            );

            /** Push vào dữ liệu hiện tại của goodsDelivery */
            state.goodsDelivery.data.out_bound_pickers = state.goodsDelivery.data.out_bound_pickers.filter(i => i.id !== action.payload.id);
            state.goodsDelivery.data.out_bound_pickers.push(action.payload);

            return;
        },
        [pickBox.rejected]: (state, action) => {
            state.process.loading = false;

            /** Push message thông báo */
            state.process.message.unshift(
                boxMessageFormatter({
                    box_id: action?.meta?.arg,
                    type: 'error'
                })
            );

            return;
        },
        [pickGoodsDelivery.pending]: (state) => {
            state.goodsDelivery.loading = true;
            state.goodsDelivery.data = undefined;

            state.process = initialState.process;

            return
        },
        [pickGoodsDelivery.fulfilled]: (state, action) => {
            state.goodsDelivery.loading = true;
            state.goodsDelivery.data = action.payload;

            /** Tính target_boxes count */

            if (action.payload?.out_bound_pickers?.length) {
                action.payload.out_bound_pickers.forEach((outBoundPicker) => {
                    /** Push message thông báo */
                    state.process.message.unshift(
                        boxMessageFormatter({
                            box_id: outBoundPicker.box_id,
                            created_at: outBoundPicker.created_at,
                            messageId: outBoundPicker.id,
                            quantity: outBoundPicker.quantity
                        })
                    )
                });
            }

            return;
        },
        [pickGoodsDelivery.rejected]: (state) => {
            state.goodsDelivery.loading = true;
            state.goodsDelivery.data = undefined;

            return;
        },
    },
});

const outBoundPickerReducer = outBoundPickerSlice.reducer;

export const outBoundPickerAction = outBoundPickerSlice.actions;

export default outBoundPickerReducer;

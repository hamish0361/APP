import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';
import { remove, findIndex } from 'lodash';
import { dialog } from 'app/components/DialogNotify';
import _ from 'lodash';
import { boxMessageFormatter, palletMessageFormatter } from 'helper/whIOMessageFormatter';

export const addInvoice = createAsyncThunk(
    'warehouse/downContainer_AddInvoices',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.invoice.fetchInvoice(id, { with: 'inPickers;ladingBills.boxLadingBills.owningBox.box', ...params });
        return data;
    },
    {
        condition: ({ id }, { getState }) => {
            const listInvoices = getState().warehouse.downContainer.listInvoices.data;

            const matchedInvoiceIdx = findIndex(listInvoices, (p) => p.id == id); // eslint-disable-line

            if (matchedInvoiceIdx !== -1) {

                return false;
            }
        },
        dispatchConditionRejection: true
    }
);

export const loadUpBox = createAsyncThunk(
    'warehouse/downContainer_addBox',
    async ({ id, pallet_id, ...params }, thunkAPI) => {

        const curContainer = thunkAPI.getState();
        const currentContainerIdx = curContainer.warehouse.downContainer.currentContainer;
        const listInvoices = curContainer.warehouse.downContainer.listInvoices.data;

        return warehouseApi.outContainerPicker.create({
            container_id: listInvoices[currentContainerIdx].id,
            box_id: id,
            pallet_id
        });
    }
);

const initialState = {
    listInvoices: {
        data: [],
        loading: false
    },
    listPallets: {
        data: [],
        loading: false
    },
    process: {
        message: [],
        loading: false
    },
    currentContainer: -1,
    currentPallet: -1,
};

const downContainerSlice = createSlice({
    name: 'downContainer',
    initialState,
    reducers: {
        setCurrentContainer(state, action) {
            state.currentContainer = _.findIndex(state.listInvoices.data, ['id', action.payload.id]);
        },
        removeInvoiceByIdx(state, action) {
            let removedInvoice = _.find(state.listInvoices.data, ['id', action.payload.id]); // eslint-disable-line

            if (!removedInvoice) return;

            remove(state.listInvoices.data, ['id', removedInvoice.id]);

            state.currentContainer = -1;

            return;
        },
        resetSlice(state) {
            Object.entries(initialState).forEach(([k, v]) => {
                state[k] = v;
            });
        },
        addPallet(state, action) {
            state.process.message.unshift(
                palletMessageFormatter({
                    pallet_id: action.payload.id,
                    container: state.listInvoices.data[state.currentContainer]
                })
            );

            const matchedPalletIdx = _.findIndex(state.listPallets.data, ({ id }) => id == action.payload.id); // eslint-disable-line

            if (matchedPalletIdx === -1) {
                state.listPallets.data.push(action.payload);
                state.currentPallet = state.listPallets.data.length - 1;
            } else {
                state.listPallets.data[matchedPalletIdx] = action.payload;
                state.currentPallet = matchedPalletIdx;
            }
        },
        removePallet(state, action) {
            if (action.payload == state.listPallets.data[state.currentPallet].id) { // eslint-disable-line
                state.currentPallet = -1;
            }

            state.listPallets.data = state.listPallets.data.filter(i => i.id !== action.payload);
        },
        addBoxToPalletBoxes(state, action) {
            let box_id = action.payload;
            let matchedPalletBoxIdx = _.findIndex(state.listPallets.data[state.currentPallet].pivot_boxes, ['box_id', box_id]);

            state.listPallets.data[state.currentPallet].quantity_boxes += 1;

            if (matchedPalletBoxIdx !== -1) state.listPallets.data[state.currentPallet].pivot_boxes[matchedPalletBoxIdx].quantity += 1;
            else state.listPallets.data[state.currentPallet].pivot_boxes.push({ box_id, quantity: 1 });
        },
        removeBoxByPickerId(state, action) {
            let outPickerId = action.payload;
            let pickerRemoved = _.find(state.process.message, ['id', outPickerId]);

            if (!pickerRemoved) return;

            state.process.message = state.process.message.filter(m => m.id !== outPickerId);

            /** Remove in currentContainer && listInvoices */
            if (state.currentContainer !== -1)
                state.listInvoices.data[state.currentContainer].out_pickers = state.listInvoices.data[state.currentContainer].out_pickers.filter(m => m.id !== outPickerId);

            /** Update in listPallets */
            if(!state.listPallets.data.length) return;

            let pivotBoxIdx = _.findIndex(state.listPallets.data[state.currentPallet].pivot_boxes, ['box_id', pickerRemoved.box_id]);

            if (pivotBoxIdx !== -1) {
                state.listPallets.data[state.currentPallet].pivot_boxes[pivotBoxIdx].quantity -= pickerRemoved.quantity;
                state.listPallets.data[state.currentPallet].quantity_boxes -= pickerRemoved.quantity;
            }
        },
        updateBoxQuantity(state, action) {
            let { newQuantity, ...message } = action.payload;
            let messageIdx = _.findIndex(state.process.message, ['id', message.id]);

            if (messageIdx === -1) return;

            /** Update in list message */
            state.process.message[messageIdx].quantity = newQuantity;

            /** Update in listInvoices */
            if (state.currentContainer !== -1) {
                state.listInvoices.data[state.currentContainer].out_pickers = state.listInvoices.data[state.currentContainer].out_pickers.map(ip => {
                    if (ip.id === message.id) return { ...ip, quantity: newQuantity }

                    return ip;
                });
            }
        }
    },
    extraReducers: {

        [addInvoice.pending]: (state) => {
            state.listInvoices.loading = true;

            return;
        },
        [addInvoice.fulfilled]: (state, action) => {
            state.listInvoices.loading = false;
            state.listInvoices.data.push(action.payload);
            state.currentContainer = state.listInvoices.data.length - 1;

            let listOutPickers = action.payload.out_pickers || [];

            listOutPickers.forEach(b => {
                state.process.message.unshift(
                    boxMessageFormatter({
                        box_id: b.box_id,
                        time: b.created_at,
                        container: action.payload,
                        messageId: b.id,
                        quantity: b.quantity,
                        palletId: b.pallet_id
                    })
                )
            });

            return;
        },
        [addInvoice.rejected]: (state, action) => {
            state.listInvoices.loading = false;

            if (!action.meta.condition) {
                dialog.error(`Get data invoice ${action?.meta?.arg?.id} failure!`);
            }

            return;
        },
        [loadUpBox.pending]: (state, action) => {
            state.process.loading = true;
            return;
        },
        [loadUpBox.fulfilled]: (state, action) => {
            state.process.loading = false;

            if (state.currentContainer === -1) return;

            let b = action.payload;

            /** Remove đi message trước đó có cùng id */
            state.process.message = state.process.message.filter(i => i.id !== b.id);

            /** Thêm message thông báo */
            state.process.message.unshift(
                boxMessageFormatter({
                    box_id: b.box_id,
                    container: state.listInvoices.data[state.currentContainer],
                    messageId: b.id,
                    quantity: b.quantity,
                    palletId: b.pallet_id
                })
            )

            // Thêm dữ liệu vào listInvoices và currentContainer
            state.listInvoices.data[state.currentContainer].out_pickers = state.listInvoices.data[state.currentContainer].out_pickers.filter(i => i.id !== b.id);
            state.listInvoices.data[state.currentContainer].out_pickers.push(b);

            // Thêm dữ liệu vào listPalets và currentPallet
            state.listPallets.data[state.currentPallet].quantity_boxes += 1;
            state.listPallets.data[state.currentPallet].boxes_volume += b.box.volume_per_box;
            state.listPallets.data[state.currentPallet].boxes_weight += b.box.weight_per_box;

            return;
        },
        [loadUpBox.rejected]: (state, action) => {
            state.process.loading = false;

            /** Xử lý khi load pallet thất bại */
            state.process.message.unshift(
                boxMessageFormatter({
                    type: 'error',
                    box_id: action?.meta?.arg?.id,
                    container: state.listInvoices.data[state.currentContainer]
                })
            );
            return;
        },
    }
});

export const downContainerAction = downContainerSlice.actions;

const downContainerReducer = downContainerSlice.reducer;

export default downContainerReducer;

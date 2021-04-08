import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import warehouseApi from 'apis/warehouse';
import moment from 'moment';
import { remove, findIndex } from 'lodash';
import { dialog } from 'app/components/DialogNotify';
import _ from 'lodash';
import { boxMessageFormatter, notifyMessageFormatter, palletMessageFormatter } from 'helper/whIOMessageFormatter';

export const addInvoice = createAsyncThunk(
    'warehouse/loadUpContainer_AddInvoices',
    async ({ id, ...params }, thunkAPI) => {
        const data = warehouseApi.invoice.fetchInvoice(id, { with: 'inPickers;ladingBills.boxLadingBills.owningBox.box', ...params });
        return data;
    },
    {
        condition: ({ id }, { getState }) => {
            const listInvoices = getState().warehouse.loadUpContainer.listInvoices.data;

            const matchedInvoiceIdx = findIndex(listInvoices, (p) => p.id == id); // eslint-disable-line

            if (matchedInvoiceIdx !== -1) {

                return false;
            }
        },
        dispatchConditionRejection: true
    }
);

export const loadUpPallet = createAsyncThunk(
    'warehouse/loadUpContainer_addPallet',
    async ({ id, ...params }, thunkAPI) => {

        const curState = thunkAPI.getState();

        const currentContainerIdx = curState.warehouse.loadUpContainer.currentContainer;
        const listInvoices = curState.warehouse.loadUpContainer.listInvoices.data;

        return warehouseApi.inContainerPicker.create({
            container_id: listInvoices[currentContainerIdx].id,
            pallet_id: id
        });
    },
    {
        condition: ({ id }, { getState }) => {
            const listPallets = getState().warehouse.loadUpContainer.process.listPallets;

            const matchedPalletIdx = findIndex(listPallets, (p) => p.id == id); // eslint-disable-line

            if (matchedPalletIdx !== -1) {

                return false;
            }
        },
        dispatchConditionRejection: true
    }
);

export const loadUpBox = createAsyncThunk(
    'warehouse/loadUpContainer_addBox',
    async ({ id, ...params }, thunkAPI) => {
        const curState = thunkAPI.getState();

        const currentContainerIdx = curState.warehouse.loadUpContainer.currentContainer;
        const listInvoices = curState.warehouse.loadUpContainer.listInvoices.data;

        return warehouseApi.inContainerPicker.create({
            container_id: listInvoices[currentContainerIdx].id,
            box_id: id
        });
    }
);

export const cutOffContainer = createAsyncThunk(
    'warehouse/cutOffContainer',
    ({ id }, thunkAPI) => {
        return warehouseApi.invoice.update(id, { action: 'cutOff' });
    }
);

const initialState = {
    listInvoices: {
        data: [],
        loading: false
    },
    process: {
        message: [],
        loading: false
    },
    currentContainer: -1
};

const loadUpContainerSlice = createSlice({
    name: 'loadUpContainer',
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
        removeBoxByPickerId(state, action) {
            let pickerRemoved = action.payload;

            state.process.message = state.process.message.filter(m => m.id !== pickerRemoved.id);

            /** Remove in listInvoices */

            if (state.currentContainer !== -1) {
                state.listInvoices.data[state.currentContainer].in_pickers = state.listInvoices.data[state.currentContainer].in_pickers.filter(m => m.id !== pickerRemoved.id);
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
                state.listInvoices.data[state.currentContainer].in_pickers = state.listInvoices.data[state.currentContainer].in_pickers.map(ip => {
                    if (ip.id === message.id) return { ...ip, quantity: newQuantity }

                    return ip;
                });
            }
        },
        loadUpBoxSuccess(state, action) {
            state.process.loading = false;

            if (state.currentContainer === -1) return;

            let b = action.payload;

            /** Thêm message thông báo */
            state.process.message.unshift(
                boxMessageFormatter({
                    type: "success",
                    box_id: b.box_id,
                    container: state.listInvoices.data[state.currentContainer],
                    messageId: b.id,
                    palletId: b.pallet_id
                })
            );

            // Thêm dữ liệu vào listInvoices
            state.listInvoices.data[state.currentContainer].in_pickers.push(b);
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

            let listInPickers = action.payload.in_pickers || [];

            listInPickers.forEach(b => {
                /** Thêm message thông báo */
                state.process.message.unshift(
                    boxMessageFormatter({
                        type: "success",
                        created_at: b.created_at,
                        box_id: b.box_id,
                        container: action.payload,
                        quantity: b.quantity,
                        messageId: b.id,
                        palletId: b.pallet_id
                    })
                );
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

        [loadUpPallet.pending]: (state, action) => {
            state.process.loading = true;
            return;
        },
        [loadUpPallet.fulfilled]: (state, action) => {
            state.process.loading = false;

            if (state.currentContainer === -1) return;

            /** Thêm message thông báo */
            state.process.message.unshift(
                palletMessageFormatter({
                    time: moment().format('DD-MM-YYYY HH:mm'),
                    container: state.listInvoices.data[state.currentContainer],
                    pallet_id: action.meta?.arg?.id,
                })
            );

            // Thêm dữ liệu vào target_boxes
            if (action.payload?.length) {
                action.payload.forEach(b => {
                    /** Thêm message thông báo */
                    state.process.message.unshift(
                        boxMessageFormatter({
                            type: "success",
                            box_id: b.box_id,
                            container: state.listInvoices.data[state.currentContainer],
                            quantity: b.quantity,
                            messageId: b.id,
                            palletId: b.pallet_id
                        })
                    );
                });
            }

            // Thêm dữ liệu vào listInvoices và currentContainer
            state.listInvoices.data[state.currentContainer].in_pickers.push(...action.payload);

            return;
        },
        [loadUpPallet.rejected]: (state, action) => {
            state.process.loading = false;

            /** Xử lý khi load pallet thất bại */
            if (action.meta.condition) {
                // Trường hợp pallet bị lặp và bị chặn bởi condition
                state.process.message.unshift(
                    notifyMessageFormatter({
                        transObj: {
                            id: "pallet_exist",
                            value: { pallet_id: action?.meta?.arg?.id }
                        },
                        container: state.listInvoices.data[state.currentContainer]
                    })
                );
            } else {
                // Trường hợp API error
                state.process.message.unshift(
                    palletMessageFormatter({
                        time: moment().format('DD-MM-YYYY HH:mm'),
                        container: state.listInvoices.data[state.currentContainer],
                        pallet_id: action?.meta?.arg?.id
                    })
                );
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

            /** Thêm message thông báo */
            state.process.message.unshift(
                boxMessageFormatter({
                    type: "success",
                    box_id: b.box_id,
                    container: state.listInvoices.data[state.currentContainer],
                    messageId: b.id,
                    palletId: b.pallet_id
                })
            );

            // Thêm dữ liệu vào listInvoices
            state.listInvoices.data[state.currentContainer].in_pickers.push(action.payload);

            return;
        },
        [loadUpBox.rejected]: (state, action) => {
            state.process.loading = false;

            /** Xử lý khi load pallet thất bại */
            state.process.message.unshift(
                boxMessageFormatter({
                    type: "error",
                    box_id: action?.meta?.arg?.id,
                    container: state.listInvoices.data[state.currentContainer]
                })
            );
            return;
        },

        [cutOffContainer.pending]: (state) => {
            state.listInvoices.loading = true;

            return;
        },
        [cutOffContainer.fulfilled]: (state, action) => {
            state.listInvoices.loading = false;

            if (state.currentContainer !== -1)
                state.listInvoices.data[state.currentContainer].cut_off_date = action.payload?.cut_off_date;

            return;
        },
        [cutOffContainer.rejected]: (state, action) => {
            state.listInvoices.loading = false;

            return;
        },
    }
});

export const loadUpContainerAction = loadUpContainerSlice.actions;

const loadUpContainerReducer = loadUpContainerSlice.reducer;

export default loadUpContainerReducer;

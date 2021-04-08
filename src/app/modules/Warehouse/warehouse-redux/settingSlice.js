import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    default_agency: undefined,
    default_area: undefined,
    printer: {
        socketServer: 'ws://127.0.0.1:2303',
    }
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeDefaultAgency(state, action) {
            state.default_agency = action.payload;
        },
        changeDefaultArea(state, action) {
            state.default_area = action.payload;
        },
        changePrinterSocketServer(state, action) {
            state.printer.socketServer = action.payload;
        }
    },
});

const settingsReducer = settingsSlice.reducer;

export const settingsAction = settingsSlice.actions;

export default settingsReducer;

import { combineReducers } from 'redux';
import purchaseSlice from './purchaseSlice';
import trackingSlice from './trackingSlice';
import purchaseItemSlice from './purchaseItemSlice';

const purchaseReducer = combineReducers({
    list: purchaseSlice.reducer,
    tracking: trackingSlice.reducer,
    purchaseItem: purchaseItemSlice.reducer
});

export default purchaseReducer;

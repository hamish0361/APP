import { combineReducers } from 'redux';
import cartSlice from './cartSlice';
import groupSlice from './groupSlice';
import orderCostSlice from './orderCostSlice';
import orderItemSlice from './orderItemSlice';
import orderSlice from './orderSlice';
import orderStatusSlice from './orderStatusSlice';
import orderTypeSlice from './orderTypeSlice';
import purchaseItemSlice from './purchaseItemSlice';
import shipmentInfoSlice from './shipmentInfoSlice';

const orderReducer = combineReducers({
    list: orderSlice.reducer,
    status: orderStatusSlice.reducer,
    type: orderTypeSlice.reducer,
    group: groupSlice.reducer,
    purchaseItem: purchaseItemSlice.reducer,
    cost: orderCostSlice.reducer,
    item: orderItemSlice.reducer,
    shipmentInfo: shipmentInfoSlice.reducer,
    cart: cartSlice.reducer
});

export default orderReducer;

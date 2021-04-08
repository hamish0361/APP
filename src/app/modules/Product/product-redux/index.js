import { combineReducers } from 'redux';
import originReducer from './originSlice';
import productSlice from './productSlice';
import packageReducer from './packageSlice';
import supllierReducer from './supplierSlice';
import taxReducer from './taxSlice';
import unitReducer from './unitSlice';

const productReducer = combineReducers({
    list: productSlice.reducer,
    origin: originReducer,
    package: packageReducer,
    supplier: supllierReducer,
    tax: taxReducer,
    unit: unitReducer
});

export default productReducer;

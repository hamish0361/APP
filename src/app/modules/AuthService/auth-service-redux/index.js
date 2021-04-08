import { combineReducers } from 'redux';
import roleSlice from './roleSlice';
import userSlice from './userSlice';
import currencySlice from './currencySlice';
import transactionSlice from './transactionSlice';
import permissionSlice from './permissionSlice';

const authServiceReducer = combineReducers({
    role: roleSlice.reducer,
    user: userSlice.reducer,
    currency: currencySlice.reducer,
    transaction: transactionSlice.reducer,
    permission: permissionSlice.reducer
});

export default authServiceReducer;

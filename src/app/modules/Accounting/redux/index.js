import { combineReducers } from 'redux';
import transactionSlice from './transactionSlice';
import cardSlice from './cardSlice';
import receiptSlice from './receiptSlice';
import userCurrencySlice from './userCurrencySlice';

const accountingReducer = combineReducers({
    transaction: transactionSlice.reducer,
    card: cardSlice.reducer,
    receipt: receiptSlice.reducer,
    userCurrency: userCurrencySlice.reducer
});

export default accountingReducer;

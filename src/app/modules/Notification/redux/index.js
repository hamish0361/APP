import { combineReducers } from 'redux';
import logSlice from './logSlice';

const notificationReducer = combineReducers({
    log: logSlice.reducer
});

export default notificationReducer;

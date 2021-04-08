import { combineReducers } from 'redux';
import homeSlice from './homeSlice';

const homeReducer = combineReducers({
    home: homeSlice.reducer
});

export default homeReducer;

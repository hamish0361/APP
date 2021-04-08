import authServiceReducer from 'app/modules/AuthService/auth-service-redux';
import homeReducer from 'app/modules/Home/redux';
import { combineReducers } from 'redux';
import accountingReducer from '../app/modules/Accounting/redux';
import authReducer from '../app/modules/Auth/auth-redux/authSlice';
import notificationReducer from '../app/modules/Notification/redux';
import orderReducer from '../app/modules/Order/order-redux';
import productReducer from '../app/modules/Product/product-redux';
import purchaseReducer from '../app/modules/Purchase/redux';
import warehouseReducer from '../app/modules/Warehouse/warehouse-redux';

export const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer,
    order: orderReducer,
    purchase: purchaseReducer,
    product: productReducer,
    warehouse: warehouseReducer,
    accounting: accountingReducer,
    notification: notificationReducer,
    authService: authServiceReducer
});

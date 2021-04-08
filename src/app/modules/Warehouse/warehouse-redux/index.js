import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import shipmentMethodReducer from './shipmentMethodSlice';
import shelveReducer from './shelveSlice';
import areaReducer from './areaSlice';
import agencyReducer from './agencySlice';
import palletReducer from './palletSlice';
import receiptReducer from './receiptSlice';
import invoiceReducer from './invoiceSlice';
import ladingBillReducer from './ladingBillSlice';
import sfaReducer from './sfaSlice';
import boxReducer from './boxSlice';
import boxItemReducer from './boxItemSlice';
import settingsReducer from './settingSlice';
import performEntryReducer from './performEntrySlice';
import loadUpContainerReducer from './loadUpContainerSlice';
import containerTypeReducer from './containerTypeSlice';
import boxOwnerReducer from './boxOwnerSlice';
import dashboardReducer from './dashboardSlice';
import locationReducer from './locationSlice';
import whModelReducer from './whModelSlice';
import downContainerReducer from './downContainerSlice';
import goodsDeliveryReducer from './goodsDeliverySlice';
import deliveryPartnerReducer from './deliveryPartnerSlice';
import goodsDeliveryStatusReducer from './goodsDeliveryStatusSlice';
import outBoundPickerReducer from './outBoundPickerSlice';
import palletTypeReducer from './palletTypeSlice';
import placeOfDeliveryReducer from './placeOfDeliverySlice';

const settingPersistConfig = {
    key: 'settings',
    storage: storage,
}

const warehouseReducer = combineReducers({
    agency: agencyReducer,
    shipmentMethod: shipmentMethodReducer,
    shelve: shelveReducer,
    area: areaReducer,
    pallet: palletReducer,
    receipt: receiptReducer,
    invoice: invoiceReducer,
    ladingBill: ladingBillReducer,
    sfa: sfaReducer,
    box: boxReducer,
    boxItem: boxItemReducer,
    settings: persistReducer(settingPersistConfig, settingsReducer),
    performEntry: performEntryReducer,
    loadUpContainer: loadUpContainerReducer,
    containerType: containerTypeReducer,
    boxOwner: boxOwnerReducer,
    dashboard: dashboardReducer,
    location: locationReducer,
    whModel: whModelReducer,
    downContainer: downContainerReducer,
    goodsDelivery: goodsDeliveryReducer,
    deliveryPartner: deliveryPartnerReducer,
    goodsDeliveryStatus: goodsDeliveryStatusReducer,
    outBoundPicker: outBoundPickerReducer,
    palletType: palletTypeReducer,
    placeOfDelivery: placeOfDeliveryReducer,
});

export default warehouseReducer;
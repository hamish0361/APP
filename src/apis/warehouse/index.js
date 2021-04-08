import agencyApi from './agencyApi';
import areaApi from './areaApi';
import boxApi from './boxApi';
import boxItemApi from './boxItemsApi';
import costApi from './costApi';
import invoiceApi from './invoiceApi';
import ladingBillApi from './ladingBillsApi';
import palletApi from './palletApi';
import receiptApi from './receiptApi';
import sfaApi from './SFAApi';
import shelveApi from './shelveApi';
import shipmentMethodApi from './shipmentMethodApi';
import containerTypeApi from './containerTypeApi';
import boxOwnerApi from './boxOwnerApi';
import inContainerPickerApi from './inContainerPickerApi';
import outContainerPickerApi from './outContainerPickerApi';
import locationApi from './locationApi';
import boxLadingBillApi from './boxLadingBillApi';
import goodsDeliveryStatusApi from './goodsDeliveryStatusApi';
import deliveryPartnerApi from './deliveryPartnerApi';
import goodsDeliveryApi from './goodsDeliveryApi';
import outBoundPickerApi from './outBoundPickerApi';
import palletBoxesApi from './palletBoxesApi';
import goodsDeliveryBoxesApi from './goodsDeliveryBoxesApi';
import palletTypeApi from './palletTypeApi';
import placeOfDeliveryApi from './placeOfDeliveryApi';
import provinceApi from './provinceApi';

const warehouseApi = {
    agency: agencyApi,
    area: areaApi,
    box: boxApi,
    boxItem: boxItemApi,
    cost: costApi,
    invoice: invoiceApi,
    ladingBill: ladingBillApi,
    pallet: palletApi,
    receipt: receiptApi,
    SFA: sfaApi,
    shelve: shelveApi,
    shipmentMethod: shipmentMethodApi,
    containerType: containerTypeApi,
    boxOwner: boxOwnerApi,
    inContainerPicker: inContainerPickerApi,
    location: locationApi,
    outContainerPicker: outContainerPickerApi,
    boxLadingBill: boxLadingBillApi,
    goodsDeliveryStatus: goodsDeliveryStatusApi,
    deliveryPartner: deliveryPartnerApi,
    goodsDelivery: goodsDeliveryApi,
    outBoundPicker: outBoundPickerApi,
    palletBoxes: palletBoxesApi,
    goodsDeliveryBoxes: goodsDeliveryBoxesApi,
    palletType: palletTypeApi,
    placeOfDelivery: placeOfDeliveryApi,
    province: provinceApi
}

export default warehouseApi;

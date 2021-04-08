import _ from 'lodash';

export default function getShipmentMethodFromTrackingInfo(trackingObj) {
    if (!trackingObj?.orders?.length) return;

    const matchedShipmentOrder = _.find(trackingObj?.orders, ({ type }) => type.id === 'Shipment');

    return matchedShipmentOrder?.shipment_method_id;
}
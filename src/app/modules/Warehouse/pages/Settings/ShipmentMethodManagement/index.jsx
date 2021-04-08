import React, { useEffect, useRef } from 'react';
import { useHistory, useRouteMatch, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import useTrans from 'helper/useTrans';
import { fetchShipmentMethods } from 'app/modules/Warehouse/warehouse-redux/shipmentMethodSlice';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import ModalCreateShipmentMethod from './ModalCreateShipmentMethod';
import TableShipmentMethods from 'app/modules/Warehouse/components/Table/TableShipmentMethods';
import NeedPermission from 'app/components/NeedPermission';

const ShipmentMethodManagement = props => {

    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();
    const modalEditRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        f5Data();
    }, []); // eslint-disable-line

    const openCreateModal = () => {
        history.push(`${match.url}/create-shipment-method`);
    }

    const f5Data = () => {
        dispatch(fetchShipmentMethods());
    }

    const openUpdateModal = (id, palletType) => {
        modalEditRef.current.setInitialData(palletType);

        history.push(`${match.url}/edit-shipment-method/${id}`);
    }

    return (
        <>
            <NeedPermission need={['shipment-methods.create']}>
                <Route path={`${match.path}/create-shipment-method`}>
                    {({ match }) => (
                        <ModalCreateShipmentMethod
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <NeedPermission need={['shipment-methods.update']}>
                <Route path={`${match.path}/edit-shipment-method/:shipment_method_id`}>
                    {({ match }) => (
                        <ModalCreateShipmentMethod
                            id={match?.params?.shipment_method_id}
                            show={match !== null}
                            onSuccess={f5Data}
                            editMode
                            ref={modalEditRef}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="shipment-method-managements">
                <CardHeader title={trans("warehouse.shipment_method.title")}>
                    <NeedPermission need={['shipment-methods.create']}>
                        <CardHeaderToolbar>
                            <button className="btn btn-primary" onClick={openCreateModal}>{trans("warehouse.shipment_method.create.title")}</button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody>
                    <TableShipmentMethods
                        onRefresh={f5Data}
                        onViewEdit={openUpdateModal}
                    />
                </CardBody>
            </Card>
        </>
    );
};

ShipmentMethodManagement.propTypes = {

};

export default ShipmentMethodManagement;
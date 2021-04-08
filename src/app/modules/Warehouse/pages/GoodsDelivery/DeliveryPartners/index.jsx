import React, { useCallback, useEffect, useRef } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';

import useTrans from 'helper/useTrans';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import Button from 'app/components/Button';
import TableDeliveryPartner from 'app/modules/Warehouse/components/Table/TableDeliveryPartner';
import { fetchDeliveryPartners } from 'app/modules/Warehouse/warehouse-redux/deliveryPartnerSlice';
import ModalCreateDeliveryPartner from './ModalCreateDeliveryPartner';
import NeedPermission from 'app/components/NeedPermission';

const DeliveryPartners = props => {

    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const modalEditRef = useRef();

    useEffect(() => {
        f5Data();
    }, []); // eslint-disable-line

    const openModalCreate = useCallback(() => {
        history.push(`${match.url}/create-delivery-partner`);
    }, [history, match.url]);

    const openModalUpdate = useCallback((id, row) => {

        modalEditRef.current.setInitialData(row);

        history.push(`${match.url}/update-delivery-partner/${id}`);
    }, [history, match.url]);

    const f5Data = useCallback(() => {
        dispatch(fetchDeliveryPartners());
    }, [dispatch]);

    return (
        <>
            <NeedPermission need={['delivery-partners.create']}>
                <Route path={`${match.path}/create-delivery-partner`}>
                    {({ match }) => (
                        <ModalCreateDeliveryPartner
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <NeedPermission need={['delivery-partners.update']}>
                <Route path={`${match.path}/update-delivery-partner/:id`}>
                    {({ match }) => (
                        <ModalCreateDeliveryPartner
                            ref={modalEditRef}
                            id={match?.params?.id}
                            show={match !== null}
                            onSuccess={f5Data}
                            editMode
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="delivery-partners">
                <CardHeader title={trans("warehouse.delivery_partner.title")}>
                    <NeedPermission need={['delivery-partners.create']}>
                        <CardHeaderToolbar>
                            <Button type="primary" onClick={openModalCreate}>{trans("warehouse.delivery_partner.create.title")}</Button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody>
                    <TableDeliveryPartner
                        onRefresh={f5Data}
                        onViewEdit={openModalUpdate}
                    />
                </CardBody>
            </Card>
        </>
    );
};

DeliveryPartners.propTypes = {

};

export default DeliveryPartners;
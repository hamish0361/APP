import React, { useEffect, useRef } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';

import useTrans from 'helper/useTrans';
import { useDispatch } from 'react-redux';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import NeedPermission from 'app/components/NeedPermission';
import TablePlaceOfDelivery from 'app/modules/Warehouse/components/Table/TablePlaceOfDelivery';
import ModalCreatePlaceOfDelivery from './ModalCreatePlaceOfDelivery';
import { fetchPlaceOfDeliveries } from 'app/modules/Warehouse/warehouse-redux/placeOfDeliverySlice';

const PlaceOfDelivery = props => {

    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const modalEditRef = useRef();

    useEffect(() => {
        f5Data();
    }, []); // eslint-disable-line

    const f5Data = (params) => {
        dispatch(fetchPlaceOfDeliveries(params));
    }

    const handleSuccess = () => {
        f5Data();
    }

    const openModalCreatePlaceOfDelivery = () => {
        history.push(`${match.url}/create-place-of-delivery`)
    }

    const openModalEdit = (id, row) => {
        modalEditRef.current.setInitialData(row);

        history.push(`${match.path}/update-place-of-delivery/${id}`)
    }

    return (
        <>

            <NeedPermission need={['place-of-deliveries.create']}>
                <Route path={`${match.path}/create-place-of-delivery`}>
                    {({ match }) => (
                        <ModalCreatePlaceOfDelivery
                            show={match !== null}
                            onSuccess={handleSuccess}
                        />
                    )}
                </Route>
            </NeedPermission>

            <NeedPermission need={['place-of-deliveries.update']}>
                <Route path={`${match.path}/update-place-of-delivery/:id`}>
                    {({ match }) => (
                        <ModalCreatePlaceOfDelivery
                            show={match !== null}
                            id={match?.params?.id}
                            onSuccess={handleSuccess}
                            editMode
                            ref={modalEditRef}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card>
                <CardHeader title={trans("warehouse.place_of_delivery.title")}>
                    <CardHeaderToolbar>
                        <NeedPermission need={['place-of-deliveries.create']}>
                            <button className="btn btn-primary" onClick={openModalCreatePlaceOfDelivery}>{trans("warehouse.place_of_delivery.create.title")}</button>
                        </NeedPermission>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <TablePlaceOfDelivery
                        onRefresh={f5Data}
                        onViewEdit={openModalEdit}
                    />
                </CardBody>
            </Card>
        </>
    );
};

PlaceOfDelivery.propTypes = {

};

export default PlaceOfDelivery;
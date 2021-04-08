import React, { useEffect, useRef } from 'react';
import { useHistory, useRouteMatch, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import useTrans from 'helper/useTrans';
import { fetchPalletTypes } from 'app/modules/Warehouse/warehouse-redux/palletTypeSlice';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import ModalCreatePalletType from './ModalCreatePalletType';
import TablePalletTypes from 'app/modules/Warehouse/components/Table/TablePalletType';
import NeedPermission from 'app/components/NeedPermission';

const PalletType = props => {

    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();
    const modalEditPalletTypeRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        f5Data();
    }, []); // eslint-disable-line

    const openCreatePalletTypes = () => {
        history.push(`${match.url}/create-pallet-type`);
    }

    const f5Data = () => {
        dispatch(fetchPalletTypes());
    }

    const handleOpenEditPalletType = (id, palletType) => {
        modalEditPalletTypeRef.current.setInitialData(palletType);

        history.push(`${match.url}/edit-pallet-type/${id}`);
    }

    return (
        <>
            <NeedPermission need={['pallet-types.create']}>
                <Route path={`${match.path}/create-pallet-type`}>
                    {({ match }) => (
                        <ModalCreatePalletType
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <NeedPermission need={['pallet-types.update']}>
                <Route path={`${match.path}/edit-pallet-type/:pallet_type_id`}>
                    {({ match }) => (
                        <ModalCreatePalletType
                            id={match?.params?.pallet_type_id}
                            show={match !== null}
                            onSuccess={f5Data}
                            editMode
                            ref={modalEditPalletTypeRef}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="pallet-type-managements">
                <CardHeader title={trans("warehouse.pallet_type.title")}>
                    <NeedPermission need={['pallet-types.create']}>
                        <CardHeaderToolbar>
                            <button className="btn btn-primary" onClick={openCreatePalletTypes}>{trans("warehouse.pallet_type.create.title")}</button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody>
                    <TablePalletTypes
                        onRefresh={f5Data}
                        onViewEdit={handleOpenEditPalletType}
                    />
                </CardBody>
            </Card>
        </>
    );
};

PalletType.propTypes = {

};

export default PalletType;
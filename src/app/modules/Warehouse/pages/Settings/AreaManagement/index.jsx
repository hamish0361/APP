import React, { useCallback, useEffect, useRef } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';

import useTrans from 'helper/useTrans';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import TableArea from 'app/modules/Warehouse/components/Table/TableArea';
import { fetchAreas } from 'app/modules/Warehouse/warehouse-redux/areaSlice';
import Button from 'app/components/Button';
import ModalCreateArea from './ModalCreateArea';
import NeedPermission from 'app/components/NeedPermission';

const AreaManagement = props => {

    const [trans] = useTrans();
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const modalEditAreaRef = useRef();

    useEffect(() => {
        f5Data();
    }, []); // eslint-disable-line

    const f5Data = useCallback(() => {
        dispatch(fetchAreas());
    }, [dispatch]);

    const handleOpenEditArea = useCallback((id, area) => {
        modalEditAreaRef.current.setInitialData(area);

        history.push(`${match.url}/edit-area/${id}`);
    }, [history, match.url]);

    const handleOpenCreateArea = useCallback(() => {
        history.push(`${match.url}/create-area`);
    }, [history, match.url]);

    return (
        <>
            <NeedPermission need={['areas.create']}>
                <Route path={`${match.path}/create-area`}>
                    {({ match }) => (
                        <ModalCreateArea
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <NeedPermission need={['areas.update']}>
                <Route path={`${match.path}/edit-area/:id`}>
                    {({ match }) => (
                        <ModalCreateArea
                            ref={modalEditAreaRef}
                            id={match?.params?.id}
                            editMode
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="area-management">
                <CardHeader title={trans("warehouse.area.title")}>
                    <NeedPermission need={['areas.create']}>
                        <CardHeaderToolbar>
                            <Button type="primary" onClick={handleOpenCreateArea}>{trans("warehouse.area.create.title")}</Button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody>
                    <TableArea
                        onRefresh={f5Data}
                        onViewEdit={handleOpenEditArea}
                    />
                </CardBody>
            </Card>
        </>
    );
};

export default AreaManagement;
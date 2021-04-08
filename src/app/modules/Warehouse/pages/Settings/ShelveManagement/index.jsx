import React, { useCallback, useEffect, useRef } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useTrans from 'helper/useTrans';
import { fetchShelves } from 'app/modules/Warehouse/warehouse-redux/shelveSlice';

import { Card, CardBody, CardHeader, CardHeaderToolbar } from '_metronic/_partials/controls';
import TableShelve from 'app/modules/Warehouse/components/Table/TableShelve';
import Button from 'app/components/Button';
import ModalCreateShelve from './ModalCreateShelve';
import NeedPermission from 'app/components/NeedPermission';

const ShelveManagement = props => {

    const pagination = useSelector(state => state.warehouse.shelve.list.pagination);
    const [trans] = useTrans();
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const modalEditRef = useRef();

    useEffect(() => {
        f5Data({ page: pagination.page });
    }, [pagination.page]); // eslint-disable-line

    const f5Data = useCallback((params) => {
        dispatch(fetchShelves({ with: 'area', ...params }));
    }, [dispatch]);

    const handleOpenEdit = useCallback((id, shelve) => {
        modalEditRef.current.setInitialData(shelve);

        history.push(`${match.url}/edit-shelve/${id}`);
    }, [history, match.url]);

    const handleOpenModalCreate = useCallback(() => {
        history.push(`${match.url}/create-shelve`);
    }, [history, match.url]);

    return (
        <>
            <NeedPermission need={['shelves.create']}>
                <Route path={`${match.path}/create-shelve`}>
                    {({ match }) => (
                        <ModalCreateShelve
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <NeedPermission need={['shelves.update']}>
                <Route path={`${match.path}/edit-shelve/:id`}>
                    {({ match }) => (
                        <ModalCreateShelve
                            ref={modalEditRef}
                            id={match?.params?.id}
                            editMode
                            show={match !== null}
                            onSuccess={f5Data}
                        />
                    )}
                </Route>
            </NeedPermission>

            <Card className="shelve-management">
                <CardHeader title={trans("warehouse.shelve.title")}>
                    <NeedPermission need={['shelves.create']}>
                        <CardHeaderToolbar>
                            <Button type="primary" onClick={handleOpenModalCreate}>{trans("warehouse.shelve.create.title")}</Button>
                        </CardHeaderToolbar>
                    </NeedPermission>
                </CardHeader>
                <CardBody>
                    <TableShelve
                        onRefresh={f5Data}
                        onViewEdit={handleOpenEdit}
                    />
                </CardBody>
            </Card>
        </>
    );
};

export default ShelveManagement;
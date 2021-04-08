import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory, useRouteMatch } from 'react-router';

import useTrans from 'helper/useTrans';
import useColumns from './useColumns';
import warehouseApi from 'apis/warehouse';

import CustomTable from 'app/components/CustomTable';
import EmptyData from 'app/components/EmptyData';
import { dialog } from 'app/components/DialogNotify';
import ModalConfirmDelete from '../../ModalConfirmDelete';

import './index.scss';
import { shelveAction } from 'app/modules/Warehouse/warehouse-redux/shelveSlice';
import NeedPermission from 'app/components/NeedPermission';

const TableShelve = ({ onRefresh, onViewEdit }) => {
    const dataTable = useSelector(
        state => state.warehouse.shelve.list.data
    );
    const pagination = useSelector(
        state => state.warehouse.shelve.list.pagination
    );
    const columns = useColumns();
    const [trans] = useTrans();
    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();

    const handleConfirmDelete = (id) => {
        history.push(`${match.url}/delete-shelve/${id}`);
    }

    const handleDelete = (id) => {
        warehouseApi.shelve.delete(id)
            .then(() => {
                onRefresh && onRefresh();

                dialog.success(trans("warehouse.shelve.delete.success"));
            })
            .catch((err) => {
                console.error(err);

                dialog.error(trans("warehouse.shelve.delete.failure"));
            })
    }

    const handlePageChange = useCallback((page) => {
        dispatch(shelveAction.changePage(page));
    }, [dispatch]);

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.shelve.list.empty")} />;

    return (
        <div className="table-goods-deliveries">

            <NeedPermission need={['shelves.delete']}>
                <Route path={`${match.path}/delete-shelve/:shelve_id`}>
                    {({ match }) => (
                        <ModalConfirmDelete
                            id={match?.params?.shelve_id}
                            show={match != null}
                            onConfirmed={handleDelete}
                            title={trans("warehouse.shelve.delete.title")}
                        />
                    )}
                </Route>
            </NeedPermission>

            <CustomTable
                columns={columns}
                rows={dataTable}
                onDelete={handleConfirmDelete}
                onViewEdit={onViewEdit}
                page={pagination.page}
                lastpage={pagination.lastPage}
                onPageChange={handlePageChange}
                rowKey="id"
                noSTT
                permissions={{
                    update: 'shelves.update',
                    delete: 'shelves.delete',
                }}
            />
        </div>
    );
};

TableShelve.propTypes = {
    onRefresh: PropTypes.func
};

export default TableShelve;

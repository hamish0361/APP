import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import formatNumber from 'helper/formatNumber';
import { sfaAction } from 'app/modules/Warehouse/warehouse-redux/sfaSlice';
import warehouseApi from 'apis/warehouse';
import { currenyUnit } from 'config/currency';

import CustomTable from 'app/components/CustomTable';
import ModalConfirmDelete from '../../ModalConfirmDelete';
import { dialog } from 'app/components/DialogNotify';

import './index.scss';
import EmptyData from 'app/components/EmptyData';
import useTrans from 'helper/useTrans';

const TableSFA = ({ refreshData, onViewEdit }) => {
    const { pagination, data: dataTable } = useSelector(
        state => state.warehouse.sfa.list
    );

    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const [trans] = useTrans();

    useEffect(() => {
        return () => {
            dispatch(sfaAction.resetParams());
        }
    }, []); // eslint-disable-line

    const columns = useMemo(() => ([
        { id: 'id', title: trans("warehouse.sfa.title") },
        { id: 'tracking', title: trans("warehouse.tracking.title") },
        { id: ['agency', 'name'], title: trans("common.agency") },
        { id: 'quantity', title: trans("common.quantity"), render: cell => formatNumber(cell) },
        {
            id: 'shipping_inside',
            title: trans("warehouse.cost.shipping_inside"),
            render: cell => `${formatNumber(Number(cell))} ${currenyUnit}`
        },
    ]), [trans]);

    const handlePageChange = page => {
        dispatch(sfaAction.changePagination({ page }));
    };

    const handleConfirmDelete = sfaId => {
        history.push(`${match.url}/delete-sfa/${sfaId}`);
    };

    const handleViewEditRow = sfaId => {
        onViewEdit && onViewEdit(sfaId);
    };

    const handleDelete = sfaId => {
        warehouseApi.SFA.delete(sfaId)
            .then(() => {
                refreshData && refreshData();
                dialog.success(trans("warehouse.sfa.delete.success"));
            })
            .catch(() => {
                dialog.error(trans("warehouse.sfa.delete.failure"));
            });
    };

    if(!dataTable.length) return <EmptyData emptyText={trans("warehouse.sfa.empty")} />

    return (
        <div className="table-sfa-list">
            <Route path={`${match.path}/delete-sfa/:id`}>
                {({ history, match }) => (
                    <ModalConfirmDelete
                        id={match?.params?.id}
                        show={match != null}
                        onConfirmed={handleDelete}
                        title={trans("warehouse.sfa.delete.title")}
                    />
                )}
            </Route>
            <CustomTable
                columns={columns}
                rows={dataTable}
                page={pagination.page}
                lastpage={pagination.lastPage}
                onDelete={handleConfirmDelete}
                onViewEdit={handleViewEditRow}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

TableSFA.propTypes = {
    refreshData: PropTypes.func
};

export default TableSFA;

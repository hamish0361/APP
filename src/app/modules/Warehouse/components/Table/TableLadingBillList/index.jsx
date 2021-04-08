import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ladingBillAction } from 'app/modules/Warehouse/warehouse-redux/ladingBillSlice';
import warehouseApi from 'apis/warehouse';
import useColumns from './useColumns';
import useTrans from 'helper/useTrans';

import CustomTable from 'app/components/CustomTable';
import ModalConfirmDelete from '../../ModalConfirmDelete';
import { dialog } from 'app/components/DialogNotify';
import EmptyData from 'app/components/EmptyData';

import './index.scss';

const TableLadingBillList = ({ onRefresh }) => {
    const { data: dataTable, pagination } = useSelector(
        state => state.warehouse.ladingBill.list
    );

    const history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const columns = useColumns();
    const [trans] = useTrans();

    const handleConfirmDelete = rowId => {
        history.push(`${match.url}/delete-lading-bill/${rowId}`);
    };

    const handleViewEditRow = rowId => {
        history.push(`/warehouse/lading-bills/${rowId}`);
    };

    const handleDelete = rowId => {
        warehouseApi.ladingBill
            .delete(rowId)
            .then(() => {
                onRefresh && onRefresh();
                dialog.success('Delete lading bill success!');
            })
            .catch(() => {
                dialog.error('Delete lading bill failure!');
            });
    };

    const handlePageChange = page => {
        dispatch(ladingBillAction.setPage(page));
    };

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.lading_bill.empty")} />

    return (
        <div className="table-lading-bill">
            <Route path={`${match.path}/delete-lading-bill/:lb_id`}>
                {({ history, match }) => (
                    <ModalConfirmDelete
                        id={match?.params?.lb_id}
                        show={match != null}
                        onConfirmed={handleDelete}
                        title={trans("warehouse.lading_bill.delete.title")}
                    />
                )}
            </Route>
            <CustomTable
                columns={columns}
                rows={dataTable}
                onDelete={handleConfirmDelete}
                onViewEdit={handleViewEditRow}
                page={pagination.page}
                lastpage={pagination.lastPage}
                onPageChange={handlePageChange}
                rowKey="id"
                noSTT
                permissions={{
                    update: 'lading-bills.update',
                    delete: 'lading-bills.delete'
                }}
            />
        </div>
    );
};

TableLadingBillList.propTypes = {
    onRefresh: PropTypes.func
};

export default TableLadingBillList;

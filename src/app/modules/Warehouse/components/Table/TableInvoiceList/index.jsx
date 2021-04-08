import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { invoiceAction } from 'app/modules/Warehouse/warehouse-redux/invoiceSlice';
import warehouseApi from 'apis/warehouse';
import useColumn from './useColumn';

import CustomTable from 'app/components/CustomTable';
import ModalConfirmDelete from '../../ModalConfirmDelete';
import { dialog } from 'app/components/DialogNotify';
import EmptyData from 'app/components/EmptyData';
import useTrans from 'helper/useTrans';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

const TableInvoiceList = ({ onRefresh }) => {
    const { data: dataTable, pagination } = useSelector(
        state => state.warehouse.invoice.list
    );

    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const columns = useColumn();
    const [trans] = useTrans();

    const handleConfirmDelete = rowId => {
        history.push(`${match.url}/delete-container/${rowId}`);
    };

    const handleViewEditRow = rowId => {
        history.push(`/warehouse/container/detail/${rowId}`);
    };

    const handleDelete = rowId => {
        warehouseApi.invoice
            .delete(rowId)
            .then(() => {
                onRefresh && onRefresh();
                dialog.success(trans("warehouse.invoice.delete.success"));
            })
            .catch(() => {
                dialog.error(trans("warehouse.invoice.delete.failure"));
            });
    };

    const handleChangePage = page => {
        dispatch(invoiceAction.setPage(page));
    };

    if (!dataTable.length) return <EmptyData emptyText={trans("warehouse.invoice.empty")} />;

    return (
        <>
            <NeedPermission need="containers.delete">
                <Route path={`${match.path}/delete-container/:invoice_id`}>
                    {({ history, match }) => (
                        <ModalConfirmDelete
                            id={match?.params?.invoice_id}
                            show={match != null}
                            onConfirmed={handleDelete}
                            title={trans("warehouse.invoice.delete.title")}
                        />
                    )}
                </Route>
            </NeedPermission>

            <CustomTable
                columns={columns}
                rows={dataTable}
                page={pagination.page}
                lastpage={pagination.lastPage}
                onDelete={handleConfirmDelete}
                onViewEdit={handleViewEditRow}
                onPageChange={handleChangePage}
                rowKey="id"
                className="table-invoice-list"
                noSTT
                permissions={{
                    delete: 'containers.delete'
                }}
            />
        </>
    );
};

TableInvoiceList.propTypes = {
    onRefresh: PropTypes.func
};

export default TableInvoiceList;

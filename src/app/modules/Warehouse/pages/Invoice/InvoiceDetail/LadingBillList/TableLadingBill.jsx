import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import warehouseApi from 'apis/warehouse';
import useColumns from './useColumns';
import useTrans from 'helper/useTrans';

import CustomTable from 'app/components/CustomTable';
import ModalConfirmDelete from 'app/modules/Warehouse/components/ModalConfirmDelete';
import { dialog } from 'app/components/DialogNotify';
import EmptyData from 'app/components/EmptyData';

import './TableLadingBill.scss';
import NeedPermission from 'app/components/NeedPermission';

const TableLadingBill = ({ onRefresh }) => {
    const { data } = useSelector(
        state => state.warehouse.invoice.detail
    );

    const history = useHistory();
    const match = useRouteMatch();
    const columns = useColumns();
    const [trans] = useTrans();

    const handleConfirmDelete = rowId => {
        history.push(`${match.url}/delete-lading-bill/${rowId}`);
    };

    const handleViewEditRow = rowId => {
        history.push(`/warehouse/lading-bills/${rowId}`);
    };

    const handleDelete = rowId => {
        warehouseApi.invoice.update(match?.params?.id, {
            action: 'detach',
            params: JSON.stringify(['ladingBills', rowId])
        })
            .then(() => {
                onRefresh && onRefresh();
                dialog.success(trans("warehouse.invoice.pivot.lading_bill.delete.success"));
            })
            .catch(() => {
                dialog.error(trans("warehouse.invoice.pivot.lading_bill.delete.failure"));
            })
    };

    if (!data?.lading_bills?.length) return <EmptyData emptyText={trans("warehouse.invoice.pivot.lading_bill.empty")} />

    return (
        <div className="table-lading-bill">
            <NeedPermission need={['containers.update', 'lading-bills.update']} permissionJoin="and">
                <Route path={`${match.path}/delete-lading-bill/:lb_id`}>
                    {({ match }) => (
                        <ModalConfirmDelete
                            id={match?.params?.lb_id}
                            show={match != null}
                            onConfirmed={handleDelete}
                            title={trans("warehouse.invoice.pivot.lading_bill.delete.title")}
                        />
                    )}
                </Route>
            </NeedPermission>
            <CustomTable
                columns={columns}
                rows={data?.lading_bills}
                onDelete={handleConfirmDelete}
                onViewEdit={handleViewEditRow}
                rowKey="id"
                permissions={{
                    delete: ['containers.update', 'lading-bills.update']
                }}
            />
        </div>
    );
};

TableLadingBill.propTypes = {
    onRefresh: PropTypes.func
};

export default TableLadingBill;

import React from 'react';
import { useSelector } from 'react-redux';

import warehouseApi from 'apis/warehouse';
import { dialog } from 'app/components/DialogNotify';

import CustomTable from 'app/components/CustomTable';
import EmptyData from 'app/components/EmptyData';
import ModalConfirm from 'app/modules/Warehouse/components/ModalConfirm';
import useTrans from 'helper/useTrans';
import useColumns from './useColumns';

import './index.scss';
import NeedPermission from 'app/components/NeedPermission';

function TableBoxInLadingBill({ onRefresh }) {

    const dataTable = useSelector(state => state.warehouse.ladingBill.detail.data?.box_lading_bills);

    const [trans] = useTrans();
    const [columns, modalConfirmRef] = useColumns({ onRefresh });

    const deleteBoxLadingBill = ({ id }) => {
        warehouseApi.boxLadingBill.delete(id)
            .then(() => {
                onRefresh && onRefresh();
                dialog.success(trans("warehouse.sku.pivot.lading_bill.delete.success"));
            })
            .catch(() => {
                dialog.error(trans("warehouse.sku.pivot.lading_bill.delete.failure"));
            })
    }

    if (!dataTable?.length) return <EmptyData emptyText={trans("warehouse.sku.pivot.lading_bill.empty")} />

    return (
        <div>
            <ModalConfirm ref={modalConfirmRef} onOk={deleteBoxLadingBill} />
            <NeedPermission need={['box-lading-bills.index']}>
                <CustomTable
                    columns={columns}
                    rows={dataTable}
                    isViewEdit={false}
                    isDelete={false}
                    isAction={false}
                    className="table-list-box-in-lading-bill"
                />
            </NeedPermission>
        </div>
    );
}

export default TableBoxInLadingBill;

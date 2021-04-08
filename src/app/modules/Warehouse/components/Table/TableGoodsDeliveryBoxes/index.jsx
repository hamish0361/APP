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

function TableGoodsDeliveryBoxes({ onRefresh }) {

    const dataTable = useSelector(state => state.warehouse.goodsDelivery.detail.data?.pivot_boxes);

    const [trans] = useTrans();
    const [columns, modalConfirmRef] = useColumns({ onRefresh });

    const deleteBox = ({id }) => {
        warehouseApi.goodsDeliveryBoxes.delete(id)
            .then(() => {
                onRefresh && onRefresh();
                dialog.success(trans("warehouse.goods_delivery.pivot.box_lading_bill.delete.success"));
            })
            .catch(() => {
                dialog.error(trans("warehouse.goods_delivery.pivot.box_lading_bill.delete.failure"));
            })
    }

    if (!dataTable?.length) return <EmptyData emptyText={trans("warehouse.goods_delivery.pivot.box_lading_bill.empty")} />

    return (
        <div>
            <ModalConfirm ref={modalConfirmRef} onOk={deleteBox} />
            <CustomTable
                columns={columns}
                rows={dataTable}
                isViewEdit={false}
                isDelete={false}
                isAction={false}
                className="table-list-box-in-goods-delivery"
            />
        </div>
    );
}

export default TableGoodsDeliveryBoxes;

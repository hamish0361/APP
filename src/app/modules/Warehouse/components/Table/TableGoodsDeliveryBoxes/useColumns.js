import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import _ from 'lodash';
import warehouseApi from 'apis/warehouse';
import { dialog } from 'app/components/DialogNotify';
import { toAbsoluteUrl } from '_metronic/_helpers';
import useTrans from 'helper/useTrans';

import SVG from 'react-inlinesvg';
import NeedPermission from 'app/components/NeedPermission';

export default function useColumns({ onRefresh }) {
    const dataTable = useSelector(state => state.warehouse.goodsDelivery.detail.data?.pivot_boxes);
    const params = useParams();
    const modalConfirmRef = useRef();
    const inputQuantityRef = useRef([]);
    const [trans] = useTrans();

    useEffect(() => {
        if (dataTable?.length) {
            dataTable.forEach(d => {
                if (inputQuantityRef.current[d.id]) inputQuantityRef.current[d.id].value = d?.quantity;
            });
        }
    }, [dataTable]);

    const handleChangeQuantity = (e, row) => {
        if (e.charCode === 13) dispatchUpdateQuantity(e.target.value, row)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchUpdateQuantity = useCallback(_.debounce((quantity, row) => {
        if (!params?.id) return;

        let availableQuantity = row.quantity + row.box_lading_bill.quantity_avaliable_in_goods_delivery;

        if (quantity > availableQuantity) {
            dialog.warning(trans("validation.message.max_sku_quantity_available", { max: availableQuantity }));

            if (inputQuantityRef?.current?.[row.id]) inputQuantityRef.current[row.id].value = row.quantity;

            return;
        }

        warehouseApi.goodsDeliveryBoxes.update(row?.id, { quantity })
            .then(() => {
                onRefresh && onRefresh();
                dialog.success(trans("warehouse.sku.pivot.lading_bill.update_quantity.success"));
            })
            .catch((err) => {
                let errMessage = trans("warehouse.sku.pivot.lading_bill.update_quantity.failure");

                if (err?.response?.data?.errors?.message) errMessage = err.response.data.errors.message;
                dialog.error(errMessage);
            })
    }, 700), []);

    const confirmDeleteBoxItem = (row) => {
        modalConfirmRef.current.open({
            title: `${trans("warehouse.sku.pivot.lading_bill.update_quantity.title")}?`,
            ...row
        });
    }

    const columns = useMemo(() => ([
        { id: ["box_lading_bill", "owning_box", "box_id"], title: trans("warehouse.sku.title") },
        {
            id: ["box_lading_bill", "owning_box", "objectable_id"], title: trans("warehouse.sku.owner.title"), render: (objectable_id, { box_lading_bill }) => (
                <div className="owner-object">
                    <span className="object-type">{box_lading_bill.owning_box.objectable_type === 'user' ? trans("common.customer") : trans("common.the_order")}</span>
                    <span> - </span>
                    <span className="object-id">{trans("common.code")}: {objectable_id}</span>
                </div>
            )
        },
        {
            id: ['quantity'], title: trans("common.quantity"), render: (quantity, row) => {
                return (
                    <NeedPermission need={['goods-deliveries.update']} fallback={quantity}>
                        <input
                            name={row.id}
                            ref={ref => inputQuantityRef.current[row.id] = ref}
                            className="form-control"
                            type="number"
                            onKeyPress={(e) => handleChangeQuantity(e, row)}
                        />
                    </NeedPermission>
                )
            }
        },
        {
            id: 'id',
            render: (id, row) => (
                <NeedPermission need={['goods-deliveries.update']}>
                    <button
                        className="btn btn-icon btn-light btn-hover-danger btn-sm"
                        onClick={() =>
                            confirmDeleteBoxItem(row)
                        }
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG
                                src={toAbsoluteUrl(
                                    '/media/svg/icons/General/Trash.svg'
                                )}
                            ></SVG>
                        </span>
                    </button>
                </NeedPermission>
            )
        }
    ]), []); // eslint-disable-line

    return [columns, modalConfirmRef];
}
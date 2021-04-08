import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import formatNumber from 'helper/formatNumber';
import _, { find } from 'lodash';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import useTrans from 'helper/useTrans';

export default function useColumns() {
    const columns = useSelector(state => state.warehouse.dashboard.columns);
    const location = useLocation();
    const [trans] = useTrans();

    const locationSearch = useMemo(() => {
        return queryString.parse(location.search);
    }, [location]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const COLUMNS = [
        {
            id: 'id',
            key: 'sku',
            title: trans('warehouse.sku.title'),
            render: (sku, row) => (
                <div className="sku-info">
                    <div
                        className="font-weight-bold sku cursor-pointer"
                        onClick={() => gotoPerformEntry(row)}
                    >
                        {sku}
                    </div>
                    <div className="sku-duplicate">
                        {trans('warehouse.quantity.total')}:{' '}
                        <span className="font-weight-bold">
                            {formatNumber(row.duplicate)}
                        </span>
                    </div>
                    <div className="sku-duplicate">
                        {trans('warehouse.quantity.in_stock')}:{' '}
                        <span className="font-weight-bold">
                            {formatNumber(getQuantityBoxInWarehouse(row))}
                        </span>
                    </div>

                    <div className="sku-info__extra-content">
                        <div className="sfa-id">
                            {trans('warehouse.sfa.title')}:{' '}
                            <span className="font-weight-bold">
                                {row.sfa_id}
                            </span>
                        </div>
                        <div className="tracking">
                            {trans('warehouse.tracking.title')}:{' '}
                            <span className="font-weight-bold">
                                {row.sfa?.tracking}
                            </span>
                        </div>
                        <div className="created_date">
                            {trans('common.created_at')}:{' '}
                            <span className="font-weight-bold">
                                {row.created_at || '---'}
                            </span>
                        </div>
                        {locationSearch['items.product_id'] && (
                            <>
                            <div className="search-jancode">
                                {trans('warehouse.jancode.title')} [
                                {locationSearch['items.product_id']}]:{' '}
                                <span className="font-weight-bold">
                                    {formatNumber(
                                        getQuantityProductInBox(row).inWH
                                    )}
                                    /
                                    {formatNumber(
                                        getQuantityProductInBox(row).total
                                    )}
                                </span>
                            </div>

                            <div className="search-jancode expiry_date">
                                {trans('common.expiry_date')} [
                                {locationSearch['items.product_id']}]:{' '}
                                <span className="font-weight-bold">
                                    {getQuantityProductInBox(row).expiry_date}
                                </span>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            )
        },
        {
            id: 'pivot_pallets',
            key: 'pallets',
            title: trans('common.storage'),
            render: pivot_pallets => {
                if (!pivot_pallets?.length)
                    return (
                        <span className="empty-text">
                            {trans('warehouse.sku.not_storage')}
                        </span>
                    );

                return pivot_pallets.map((pivotPallet, idx) => (
                    <div
                        className="pallet-wrapper split-with-other-vertical"
                        key={`pallet-${idx}`}
                    >
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="pallet-id">
                                {trans('warehouse.pallet.id')}:{' '}
                                <span className="font-weight-bold">
                                    {pivotPallet.pallet.id}
                                </span>
                            </div>
                            <div className="pallet-position">
                                {pivotPallet.pallet?.location?.floor
                                    ? `F${pivotPallet.pallet?.location?.floor} x R${pivotPallet.pallet?.location?.row} x C${pivotPallet.pallet?.location?.column}`
                                    : '---'}
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <div className="pallet-quantity">
                                {trans(
                                    'warehouse.quantity.on_pallet.shorthand'
                                )}
                                :{' '}
                                <span className="font-weight-bold">
                                    {formatNumber(pivotPallet.current_quantity)}
                                </span>
                            </div>
                            <div className="shelve-id">
                                {trans('warehouse.shelve.title')}:{' '}
                                <span className="font-weight-bold">
                                    {pivotPallet?.pallet?.location?.shelve_id || '---'}
                                </span>
                            </div>
                        </div>
                    </div>
                ));
            }
        },
        {
            id: 'owners',
            key: 'order',
            title: trans('common.the_order'),
            render: owners => {
                if (!owners?.length)
                    return (
                        <span className="empty-text">
                            {trans('warehouse.sku.inventory_crate')}
                        </span>
                    );

                return owners.map((owner, idx) => (
                    <div
                        className="owner-wrapper split-with-other-vertical"
                        key={`owner-${idx}`}
                    >
                        <div className="owner-type">
                            {owner.objectable_type === 'user'
                                ? `${trans('common.customer')}`
                                : `${trans('common.the_order')}:`}
                            <span className="font-weight-bold ml-5">
                                {owner.objectable_id}
                            </span>
                        </div>
                        <div className="owner-quantity">
                            {trans('common.quantity')}:{' '}
                            <span className="font-weight-bold">
                                {formatNumber(owner.quantity)}
                            </span>
                        </div>
                    </div>
                ));
            }
        },
        {
            id: 'box_lading_bills',
            key: 'lading_bills',
            title: trans('warehouse.lading_bill.title'),
            render: (boxLadingBills, { owners }) => {

                const ladingBillsList = owners.reduce((prevValue, curOwner) => {
                    if (!curOwner?.box_lading_bills?.length) return prevValue;

                    let listLadingBillsOfCurOwner = curOwner.box_lading_bills.map(i => ({ ...i.lading_bill, quantity: i.quantity }));

                    return [...prevValue, ...listLadingBillsOfCurOwner];
                }, []);

                if (!ladingBillsList?.length)
                    return (
                        <span className="empty-text">
                            {trans('warehouse.sku.not_have.lading_bill')}
                        </span>
                    );

                return ladingBillsList.map((l_lb, idx) => (
                    <div
                        className="lading-bill-wrapper split-with-other-vertical"
                        key={`lading-bill-${idx}`}
                    >
                        <div className="lading-bill-info">
                            <div
                                className="lading-bill-id cursor-pointer"
                                onClick={() => gotoLadingBill(l_lb)}
                            >
                                {trans('warehouse.lading_bill.id')}:{' '}
                                <span className="font-weight-bold text-primary">
                                    {l_lb.id}
                                </span>
                            </div>
                            <div className="lading-bill-quantity">
                                SL:{' '}
                                <span className="font-weight-bold">
                                    {formatNumber(l_lb.quantity)}
                                </span>
                            </div>
                        </div>

                        <div className="container-list mt-3">
                            {l_lb.containers.map((container, cIdx) => (
                                <div
                                    className="container-wrapper"
                                    key={`container-${cIdx}`}
                                >
                                    <div
                                        className="container-id cursor-pointer"
                                        onClick={() => gotoContainer(container)}
                                    >
                                        {trans('warehouse.invoice.title')}:{' '}
                                        <span className="font-weight-bold text-primary">
                                            {container.id}
                                        </span>
                                    </div>
                                    <div className="container-shipping_date">
                                        {container.shipping_date
                                            ? `Ngày giao hàng: ${container.shipping_date}`
                                            : '---'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ));
            }
        }
    ];

    const getQuantityBoxInWarehouse = useCallback(row => {
        return row.quantity_inventory;
    }, []);

    const getQuantityProductInBox = useCallback(row => {
        let quantityProduct = 0;
        let expiry_date = '---';

        if (row?.items?.length) {
            quantityProduct = find(row.items, [
                    'product_id',
                    locationSearch['items.product_id']
                ])?.quantity || 0;

            expiry_date = find(row.items, [
                'product_id',
                locationSearch['items.product_id']
            ])?.expiry_date || '---';
        }

        return {
            total: quantityProduct * row.duplicate,
            inWH: getQuantityBoxInWarehouse(row) * quantityProduct,
            expiry_date
        };
    }, [getQuantityBoxInWarehouse, locationSearch]);

    const activeColumns = useMemo(() => {
        return columns
            .filter(c => c.show)
            .map(c => {
                const matchedColumn = _.find(COLUMNS, ['key', c.id]);

                return matchedColumn;
            });
    }, [columns, COLUMNS]); // eslint-disable-line

    const gotoPerformEntry = row => {
        window.open(
            `/warehouse/inbound/step-2/${row.sfa_id}/${row.id}`,
            '_blank'
        );
    };

    const gotoLadingBill = lading_bill => {
        window.open(`/warehouse/lading-bills/${lading_bill.id}`, '_blank');
    };

    const gotoContainer = container => {
        window.open(`/warehouse/container/detail/${container.id}`, '_blank');
    };

    return [activeColumns];
}

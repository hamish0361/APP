import React from 'react';

import { currenyUnit } from 'config/currency';
import formatNumber from 'helper/formatNumber';
import useTrans from 'helper/useTrans';
import clsx from 'clsx';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        { id: 'id', title: trans("warehouse.lading_bill.id") },
        { id: 'customer_id', title: trans("common.customer") },
        {
            id: 'containers', title: trans("warehouse.lading_bill.pivot.container.title"), render: (containers) => (
                <div className="text-center">
                    {containers?.length ? containers.map(i => (
                        <div className="container-info">
                            <div className="d-flex align-items-center justify-content-between" key={i.id}>
                                <div>{trans("warehouse.container.id")} - <span className="text-primary font-weight-bold">{i.id}</span> -</div>
                                <div>{i.shipping_date || '---'}</div>
                            </div>
                            <div className={clsx("container-type text-left font-weight-bold", i.type.shipment_method_id === 'sea' ? 'text-primary' : 'text-success')}>{i.type.shipment_method.name}</div>
                        </div>
                    )) : '---'}
                </div>
            )
        },
        {
            id: 'balance', title: trans("warehouse.lading_bill.cost"), render: (balance, { shipping_inside_cost, additional_cost }) => (
                <div>
                    {formatNumber(balance, { round: 2 })} {currenyUnit}
                    <div className="text-nowrap d-flex align-items-center justify-content-between"><small className="text-primary">{trans("warehouse.cost.shipping_inside")}: </small><small className="text-primary">{formatNumber(shipping_inside_cost, { round: 2 })} {currenyUnit}</small></div>
                    <div className="text-nowrap d-flex align-items-center justify-content-between"><small className="text-primary">{trans("warehouse.cost.additional")}: </small><small className="text-primary">{formatNumber(additional_cost, { round: 2 })} {currenyUnit}</small></div>
                </div>
            )
        },
        {
            id: 'storage_cost', title: trans("warehouse.cost.storage"), render: (storage_cost, { quantity_boxes }) => (
                <div>
                    {formatNumber(storage_cost, { round: 2 })} {currenyUnit}
                    <div><small className="text-primary text-nowrap">{trans("warehouse.sku.quantity")}: {formatNumber(quantity_boxes)}</small></div>
                </div>
            )
        }
    ];
}
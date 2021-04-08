import React from 'react';
import useTrans from "helper/useTrans";
import formatNumber from 'helper/formatNumber';
import { currenyUnit } from 'config/currency';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        { id: 'customer_id', title: trans("common.customer") },
        {
            id: 'balance', title: trans("warehouse.cost.shipping"), render: (balance, { shipping_inside_cost, additional_cost }) => (
                <div>
                    {formatNumber(balance, { round: 2 })} {currenyUnit}
                    <div><small className="text-primary">{trans("warehouse.cost.shipping_inside")}: {formatNumber(shipping_inside_cost, { round: 2 })} {currenyUnit}</small></div>
                    <div><small className="text-primary">{trans("warehouse.cost.additional")}: {formatNumber(additional_cost, { round: 2 })} {currenyUnit}</small></div>
                </div>
            )
        },
        {
            id: 'storage_cost', title: trans("warehouse.cost.storage"), render: (storage_cost, { quantity_boxes }) => (
                <div>
                    {formatNumber(storage_cost, { round: 2 })} {currenyUnit}
                    <div><small className="text-primary">{trans("warehouse.sku.quantity")}: {quantity_boxes}</small></div>
                </div>
            )
        }
    ]
}
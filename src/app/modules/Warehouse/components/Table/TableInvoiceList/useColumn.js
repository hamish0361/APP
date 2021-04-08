import React from 'react';

import { currenyUnit } from 'config/currency';
import formatNumber from 'helper/formatNumber';
import useTrans from 'helper/useTrans';

export default function useColumn() {

    const [trans] = useTrans();

    return [
        { id: 'id', title: trans("warehouse.container.id") },
        {
            id: 'shipment_method',
            title: trans("warehouse.container.shipment"),
            render: (shipment_method, { from_area, to_area, max_volume, max_weight }) => (
                <div className="container-shipment sub-info">
                    <div className="sub-info__item">
                        <span className="sub-info__title">{trans("warehouse.shipment_method.title")}: </span>
                        <span className="sub-info__value">{shipment_method?.name || '---'}</span>
                    </div>
                    <div className="sub-info__item">
                        <span className="sub-info__title">{trans("common.from")} </span>
                        <span className="sub-info__value">{from_area?.name || '---'}</span>
                    </div>
                    <div className="sub-info__item">
                        <span className="sub-info__title">{trans("common.to")} </span>
                        <span className="sub-info__value">{to_area?.name || '---'}</span>
                    </div>
                    <div className="sub-info__item">
                        <span className="sub-info__title">{trans("common.max_volume")} </span>
                        <span className="sub-info__value">{formatNumber(max_volume)}</span>
                    </div>
                    <div className="sub-info__item">
                        <span className="sub-info__title">{trans("common.max_weight")} </span>
                        <span className="sub-info__value">{formatNumber(max_weight)}</span>
                    </div>
                </div>
            )
        },
        {
            id: 'shipping_date', title: trans("warehouse.invoice.sub_info"), render: (shipping_date, { vanning_date, departure_date, cut_off_date, arrival_date }) => (
                <div className="sub-info">
                    <div className="sub-info__item">
                        <div className="sub-info__title">{trans("warehouse.invoice.shipping_date")}</div>
                        <div className="sub-info__value">{shipping_date || '---'}</div>
                    </div>

                    <div className="sub-info__item">
                        <div className="sub-info__title">{trans("warehouse.invoice.vanning_date")}</div>
                        <div className="sub-info__value">{vanning_date || '---'}</div>
                    </div>

                    <div className="sub-info__item">
                        <div className="sub-info__title">{trans("warehouse.invoice.departure_date")}</div>
                        <div className="sub-info__value">{departure_date || '---'}</div>
                    </div>

                    <div className="sub-info__item">
                        <div className="sub-info__title">{trans("warehouse.invoice.cut_off_date")}</div>
                        <div className="sub-info__value">{cut_off_date || '---'}</div>
                    </div>

                    <div className="sub-info__item">
                        <div className="sub-info__title">{trans("warehouse.invoice.arrival_date")}</div>
                        <div className="sub-info__value">{arrival_date || '---'}</div>
                    </div>
                </div>
            )
        },
        {
            id: 'shipping_cost', title: trans("warehouse.cost.shipping"), render: (shipping_cost, { shipping_cost_per_unit }) => (
                <div className="cost-section">
                    <div className="cost-item">
                        <div className="cost-item__title">{trans("warehouse.invoice.shipping_cost.title_shorthand")}</div>
                        <div className="cost-item__value">{formatNumber(shipping_cost)} {currenyUnit}</div>
                    </div>
                    <div className="cost-item">
                        <div className="cost-item__title">{trans("warehouse.invoice.shipping_cost.per_unit")}</div>
                        <div className="cost-item__value">{formatNumber(shipping_cost_per_unit)} {currenyUnit}</div>
                    </div>
                </div>
            )
        }
    ]
}
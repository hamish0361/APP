import React from 'react';

import formatNumber from 'helper/formatNumber';
import useTrans from 'helper/useTrans';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.pallet_type.id"),
        },
        {
            id: 'max_volume',
            title: trans("common.max_volume"),
            render: (max_volume) => <b className="text-success">{formatNumber(max_volume)}</b>
        },
        {
            id: 'weight',
            title: trans("common.weight"),
            render: (weight, { max_weight }) => (
                <div className="pallet-type__weight">
                    <div className="weight--empty">{formatNumber(weight)}</div>
                    <div className="weight--max-weight">{trans("common.max_weight")}: <b className="text-primary">{formatNumber(max_weight)}</b></div>
                </div>
            )
        },
        {
            id: 'max_width',
            title: trans("common.max_width"),
            render: max_width => formatNumber(max_width)
        },
        {
            id: "max_height",
            title: trans("common.max_height"),
            render: max_height => formatNumber(max_height)
        },
        {
            id: "max_length",
            title: trans("common.max_length"),
            render: max_length => formatNumber(max_length)
        }
    ]
}
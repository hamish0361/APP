import React from 'react';

import useTrans from 'helper/useTrans';

export default function useColumn() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.location.title"),
        },
        {
            id: 'shelve',
            title: trans("warehouse.shelve.title"),
            render: (shelve, {floor, row, column}) => (
                <div className="shelve">
                    <div className="shelve--id">{trans("warehouse.shelve.title")}: {shelve.id}</div>
                    <div className="shelve--for-location">
                        <div>{trans("common.floor")}: {floor}</div>
                        <div>{trans("common.row")}: {row}</div>
                        <div>{trans("common.column")}: {column}</div>
                    </div>
                </div>
            )
        },
        {
            id: 'pallets', 
            title: trans("common.status"),
            render: (pallets) => pallets?.length ? <span className="tag occupied">{trans("common.occupied")}</span> : <span className="tag available">{trans("common.available")}</span>
        }
    ]
}
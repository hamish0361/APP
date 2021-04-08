import warehouseApi from 'apis/warehouse';
import { useEffect } from 'react';
import _ from 'lodash';

let invoiceId = 7;

let boxIds = [
    '1081002001', // 20
    '1081003001', // 21
    '1081011001', // 4
    '1082008001', // P94 - 50
    '1082008002', // P94 - 20
    '1083011002', // 132 + 168 + 168
    '1083012001', // 65
    '1083011001', // 200
    '1083004002', // 10
    '1083005001', // 10
    '1081015001', // 48
    '1082002001', // P81 - 10
    '1082002002', // P81 - 6
    '1082002003', // P81 - 5
    '1082002004', // P81 - 1
    '1082002005', // P81 - 1
    '1081010001', // 62
    '1082003001', // 25
    '1081010002', // 4
]

export default function useExportDataInvoice() {

    useEffect(() => {
        // Lấy toàn bộ box có trong invoice

        warehouseApi.boxItem.fetchBoxItems({
            with: 'box.owners;box.sfa',
            appends: 'product.package',
            search: `box_id:${boxIds.join(',')}`,
            searchFields: `box_id:in`
        })
            .then((boxItemsResponse) => {
                if (boxItemsResponse.last_page > 1) {
                    return Promise.all(_.range(2, boxItemsResponse.last_page + 1, 1).map((page) => {
                        return warehouseApi.boxItem.fetchBoxItems({
                            with: 'box.owners;box.sfa',
                            appends: 'product.package',
                            search: `box_id:${boxIds.join(',')}`,
                            searchFields: `box_id:in`,
                            page
                        })
                    })).then(([...res]) => ([boxItemsResponse, ...res]))
                }

                return [boxItemsResponse];
            })
            .then((rawServerData) => {
                return rawServerData.reduce((prevV, curV) => ([...prevV, ...curV.data]), []);
            })
            .then((formatedData) => {
                let result = formatedData.map((d) => {
                    return {
                        jancode: d.product_id,
                        description: d.product?.name,
                        origin: d.product?.origin_id,
                        quantity: d.quantity,
                        box_quantity: 1,
                        box_volume: d.box.volume_per_box,
                        unit_price: d.product?.price,
                        width: d.box.width,
                        height: d.box.height,
                        weight: d.box.weight_per_box,
                        length: d.box.length,
                        box_id: d.box_id,
                        ingredients: d.product?.ingredients,
                        sfa: d.box.sfa_id,
                        tracking: d.box.sfa.tracking,
                        owners: d.box.owners.map(d => d.objectable_id)
                    }
                })

                console.log(result, 'result')
            })
    }, []);

    return {};
}
import useTrans from 'helper/useTrans';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.shipment_method.id"),
        },
        {
            id: 'name',
            title: trans("warehouse.shipment_method.name"),
        },
        {
            id: 'fee',
            title: trans("warehouse.shipment_method.fee"),
        },
    ]
}
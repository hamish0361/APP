import formatNumber from 'helper/formatNumber';
import getDateOfWeekByNumber from 'helper/getDateOfWeekByNumber';
import useTrans from 'helper/useTrans';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.container_type.id"),
        },
        {
            id: ['shipment_method', 'name'],
            title: trans("warehouse.shipment_method.title"),
        },
        {
            id: ['to_area', 'name'],
            title: trans("warehouse.container_type.to_area"),
        },
        {
            id: 'volume',
            title: trans("common.volume"),
            render: volume => formatNumber(volume)
        },
        {
            id: 'weight',
            title: trans("common.weight"),
            render: weight => formatNumber(weight)
        },
        {
            id: "day_of_week",
            title: trans("common.day_of_week"),
            render: day_of_week => trans(getDateOfWeekByNumber(day_of_week))
        },
    ]
}
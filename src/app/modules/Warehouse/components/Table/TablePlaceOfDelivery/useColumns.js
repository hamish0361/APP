import useTrans from "helper/useTrans"

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: 'ID'
        },
        {
            id: 'consignee',
            title: trans("common.consignee")
        },
        {
            id: 'province_id',
            title: trans("common.province")
        },
        {
            id: 'district_id',
            title: trans("common.district")
        },
        {
            id: 'ward_id',
            title: trans("common.ward")
        },
        {
            id: 'address',
            title: trans("common.address")
        },
        {
            id: 'note',
            title: trans("common.note")
        }
    ]
}
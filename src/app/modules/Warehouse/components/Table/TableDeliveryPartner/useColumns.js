import useTrans from 'helper/useTrans';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.delivery_partner.id"),
        },
        {
            id: 'name',
            title: trans("warehouse.delivery_partner.name")
        },
    ]
}
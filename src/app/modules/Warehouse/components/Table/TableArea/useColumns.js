import useTrans from 'helper/useTrans';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.area.title"),
        },
        {
            id: 'name',
            title: trans("warehouse.area.name")
        },
    ]
}
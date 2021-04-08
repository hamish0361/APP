import useTrans from 'helper/useTrans';

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.shelve.title"),
        },
        {
            id: ['area', 'name'],
            title: trans("warehouse.area.name")
        },
        {
            id: 'floor',
            title: trans("common.floor")
        },
        {
            id: 'row',
            title: trans("common.row")
        },
        {
            id: 'column',
            title: trans("common.column")
        }
    ]
}
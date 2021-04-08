import useTrans from "helper/useTrans"

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.jancode.id")
        },
        {
            id: 'name',
            title: trans("PRODUCT.TITLE"),
        }
    ]
}
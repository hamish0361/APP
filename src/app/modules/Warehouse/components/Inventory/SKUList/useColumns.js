import useTrans from "helper/useTrans"

export default function useColumns() {

    const [trans] = useTrans();

    return [
        {
            id: 'id',
            title: trans("warehouse.sku.title")
        },
        {
            id: 'quantity_inventory',
            title: trans("warehouse.inventory.sku.quantity"),
        }
    ]
}